<?php

namespace App\Utilities;

use App\Drive;
use Illuminate\Database\Eloquent\Collection;

class PendingFilesProvider
{
    
    const MOVIE_FILE_TYPE = 'movie';
    const EPISODE_FILE_TYPE = 'episode';
    
    public static function getMoviesFromDrive(Drive $drive, Collection $existingMovies)
    {
        return self::getFileInfoArray(
            self::getNewVideos($drive->movie_directory(), $existingMovies),
            self::MOVIE_FILE_TYPE
        );
    }
    
    public static function getEpisodesFromDrive(Drive $drive, Collection $existingEpisodes)
    {
        return self::getFileInfoArray(
            self::getNewVideos($drive->episode_directory(), $existingEpisodes),
            self::EPISODE_FILE_TYPE
        );
    }

    /**
     * Loops through some array of new movie or episode files,
     * tries to guess the title of the movie or show from the filename,
     * searches using the IMDb API if it's an array of movie files,
     * and then appends that info to each file.
     * 
     * @param array $files The array of new movie or episode files.
     * @param string $fileType A string constant representing the type of file as a movie or episode of a TV show.
     */
    private static function getFileInfoArray(array $files, string $fileType)
    {
        return array_map(function($filename) use($fileType) {
            // Guess title from filename
            if ($fileType === self::MOVIE_FILE_TYPE) {
                $filenameParts = explode('.', $filename);
                $title = ucwords(str_replace('-', ' ', $filenameParts[0]));
            } else {
                $filenameParts = explode('.', $filename);
                $filenameParts = explode('_', $filenameParts[0]);
                $title = ucwords(str_replace('-', ' ', $filenameParts[0]));
            }
            

            $fileInfoArray = [
                'filename' => $filename,
                'title' => $title
            ];

            // If it's a movie, call the IMDb API and append the results
            // TODO This code to call the imdb api could be in its own class
            if($fileType === self::MOVIE_FILE_TYPE) {
                $key = config('app.imdb_api_key');

                throw_if(empty($key), \RuntimeException::class, 'IMDb API key not found.');
    
                $guzzleClient = new \GuzzleHttp\Client();
    
                $response = $guzzleClient->get(
                    'https://imdb8.p.rapidapi.com/title/auto-complete',
                    [
                        'headers' => [
                            'X-RapidAPI-Host' => 'imdb8.p.rapidapi.com',
                            'X-RapidAPI-Key' => $key
                        ],
                        'query' => [
                            'q' => $title
                        ]
                    ]
                );
    
                if($response->getStatusCode() === 200) {
                    $fileInfoArray['imdb'] = json_decode((string) $response->getBody(), true);
                }
            }

            return $fileInfoArray;
        }, $files);
    }

    /**
     * Returns an array of newly added files in the specified drive directory.
     * 
     * @param string $directory The directory to search in.
     * @param Collection $filesToExclude The files already accounted for in the database.
     */
    private static function getNewVideos(string $directory, Collection $filesToExclude)
    {
        $files = [];

        // Get the files on the selected drive
        $items = new \DirectoryIterator($directory);

        // Iterate over the files
        foreach($items as $item) {
            // Skip directories
            if($item->isDot() || $item->isDir()) {
                continue;
            }

            if(!in_array($item->getFilename(), $files)) {
                $files[] = $item->getFilename();
            }
        }

        // Filter out filenames that are already accounted for
        $files = collect($files)->reject(function($file) use($filesToExclude) {
            return in_array($file, $filesToExclude->pluck('filename')->toArray());
        });

        return array_values($files->toArray());
    }
    
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Drive extends Model
{
    const MOVIE_DIRECTORY = 'movies';
    const EPISODE_DIRECTORY = 'shows';
    const MOVIE_FILE_TYPE = 'movie';
    const EPISODE_FILE_TYPE = 'episode';

    public function media() {
        return $this->belongsToMany('App\Media')->withPivot('filename');
    }

    public function episodes() {
        return $this->belongsToMany('App\Episode')->withPivot('filename');
    }

    public static function pending() {
        // Get all current drives
        $drives = Drive::all();

        $pending = [];

        // Get pending files for each drive
        $drives->each(function($drive) use(&$pending) {
            $pending[$drive['id']] = [
                'movies' => self::getMoviesFromDrive($drive['id']),
                'episodes' => self::getEpisodesFromDrive($drive['id'])
            ];
        });

        return $pending;
    }

    private static function getMoviesFromDrive($driveId) {
        // Get movie filenames present in database
        $existingMovies =
            DB
                ::table('drive_media')
                ->select('filename')
                ->where('drive_id', '=', $driveId)
                ->get()
                ->pluck('filename')
                ->toArray();

        return self::getFileInfoArray(
            self::getNewVideos($driveId, self::MOVIE_DIRECTORY, $existingMovies),
            'getMovieTitleFromFilename',
            self::MOVIE_FILE_TYPE
        );
    }

    private static function getEpisodesFromDrive($driveId) {
        // Get movie filenames present in database
        $existingEpisodes =
            DB
                ::table('drive_episode')
                ->select('filename')
                ->where('drive_id', '=', $driveId)
                ->get()
                ->pluck('filename')
                ->toArray();

        return self::getFileInfoArray(
            self::getNewVideos($driveId, self::EPISODE_DIRECTORY, $existingEpisodes),
            'getShowTitleFromFilename',
            self::EPISODE_FILE_TYPE
        );
    }

    private static function getShowTitleFromFilename($filename) {
        $filenameParts = explode('.', $filename);
        $filenameParts = explode('_', $filenameParts[0]);
        return ucwords(str_replace('-', ' ', $filenameParts[0]));
    }

    private static function getMovieTitleFromFilename($filename) {
        $filenameParts = explode('.', $filename);
        return ucwords(str_replace('-', ' ', $filenameParts[0]));
    }

    /**
     * Loops through some array of new movie or episode files,
     * tries to guess the title of the movie or show from the filename,
     * searches using the IMDb API if it's an array of movie files,
     * and then appends that info to each file.
     * 
     * @param array $files The array of new movie or episode files.
     * @param string $getTitleCallback The name of the callback used to guess the title from the filename.
     * @param string $fileType A string constant representing the type of file as a movie or episode of a TV show.
     */
    private static function getFileInfoArray($files, $getTitleCallback, $fileType) {
        return array_map(function($filename) use($getTitleCallback, $fileType) {
            // Guess title from filename using the callback that was passed
            $title = call_user_func("self::$getTitleCallback", $filename);

            $fileInfoArray = [
                'filename' => $filename,
                'title' => $title
            ];

            // If it's a movie, call the IMDb API and append the results
            if(strcasecmp($fileType, self::MOVIE_FILE_TYPE) === 0) {
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
    
                if($response->getStatusCode() == 200) {
                    $fileInfoArray['imdb'] = json_decode((string) $response->getBody(), true);
                }
            }

            return $fileInfoArray;
        }, $files);
    }

    /**
     * Takes a drive ID, a string specifying the directory to search,
     * and a list of files already accounted for in the database,
     * and returns an array of newly added files.
     * 
     * @param int $driveId The ID of the drive to search.
     * @param string $directory The name of the movie or episode directory on the drive.
     * @param array $filesToExclude An array of strings representing files already accounted for in the database.
     */
    private static function getNewVideos($driveId, $directory, $filesToExclude) {
        $files = [];

        $drive = self::find($driveId);

        $pathTokens = [
            'videos',
            $drive['name'],
            $directory
        ];

        $path = implode(DIRECTORY_SEPARATOR, $pathTokens);

        // Get the files on the selected drive
        if (env('APP_ENV', 'production') === 'production') {
            $items = new \DirectoryIterator(
                public_path() . DIRECTORY_SEPARATOR . $path
            );
        } else {
            $items = new \DirectoryIterator(
                public_path() . DIRECTORY_SEPARATOR . 'testing' . DIRECTORY_SEPARATOR  . $path
            );
        }

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
        $files = collect($files);
        $files = $files->reject(function($movie) use($filesToExclude) {
            return in_array($movie, $filesToExclude);
        });

        return array_values($files->toArray());
    }
}

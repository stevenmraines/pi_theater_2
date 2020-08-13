<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Drive extends Model
{
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

        $filenames = self::getNewVideos($driveId, 'movies', $existingMovies);

        // Get newMovies as an array of arrays instead of array of string filenames
        $newMovies = array_map(function($filename) {
            return [
                'filename' => $filename,
                'title' => self::getTitleFromFilename($filename)
            ];
        }, $filenames);

        // Search IMDb API for info and append it to each movie
        $key = config('app.imdb_api_key');

        throw_if(empty($key), \RuntimeException::class, 'IMDb API key value missing in .env file.');

        $url = 'https://imdb8.p.rapidapi.com/title/auto-complete?q=';

        $guzzleClient = new \GuzzleHttp\Client();

        for($i = 0; $i < count($newMovies); $i++) {
            $response = $guzzleClient->request('GET', $url . $newMovies[$i]['title'], [
                'headers' => [
                    'X-RapidAPI-Host' => 'imdb8.p.rapidapi.com',
                    'X-RapidAPI-Key' => $key
                ]
            ]);

            if($response->getStatusCode() == 200) {
                $newMovies[$i]['imdb'] = json_decode((string) $response->getBody());
            }
        }

        return $newMovies;
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

        // TODO add IMDb API support

        return self::getNewVideos($driveId, 'shows', $existingEpisodes);
    }

    private static function getTitleFromFilename($filename) {
        $filenameParts = explode('.', $filename);
        return ucwords(str_replace('-', ' ', $filenameParts[0]));
    }

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
        $items = new \DirectoryIterator(
            public_path() . DIRECTORY_SEPARATOR . $path
        );

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

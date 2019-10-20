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
        return [
            'movies' => self::getMoviesFromDrives(),
            'episodes' => self::getEpisodesFromDrives()
        ];
    }

    private static function getMoviesFromDrives() {
        // Get movie filenames present in database
        $existingMovies =
            DB
                ::table('drive_media')
                ->select('filename')
                ->get()
                ->pluck('filename')
                ->toArray();

        return self::getNewVideos('movies', $existingMovies);
    }

    private static function getEpisodesFromDrives() {
        // Get movie filenames present in database
        $existingEpisodes =
            DB
                ::table('drive_episode')
                ->select('filename')
                ->get()
                ->pluck('filename')
                ->toArray();

        return self::getNewVideos('shows', $existingEpisodes);
    }

    private static function getNewVideos($directory, $filesToExclude) {
        $files = [];

        // Get all current drives
        $drives = Drive::all();

        // Loop through them to get movie filenames from each disk
        foreach($drives as $drive) {
            // Get the files on the current disk
            $items = new \DirectoryIterator(
                public_path() . '/videos/' . $drive['name'] . '/' . $directory
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
        }

        // Filter out filenames that are already accounted for
        $files = collect($files);
        $files = $files->reject(function($movie) use($filesToExclude) {
            return in_array($movie, $filesToExclude);
        });

        return array_values($files->toArray());
    }
}

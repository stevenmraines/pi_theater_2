<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PopulateFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'files:populate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'One-time command to take current database data and '
        . 'populate the new files table and other associated tables.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $failedMovies = [];
        $failedEpisodes = [];

        /*
         * MOVIES
         */
        echo "Processing movies...\n\n";

        // Get drive_media contents
        $media = \App\Media::all()->load('drive');

        // Assign video attributes to $media
        $media->transform(function($movie) use(&$failedMovies) {
            $video = '/var/www/pi_theater_2/public/videos/hdd1/movies/'
                . $movie->drive->first()->pivot->filename;

            echo "On file: $video - ";

            if(!file_exists($video)) {
                echo "COULD NOT FIND FILE\n";
                $failedMovies[] = $movie->toArray();
                return $movie;
            }

            echo "File found\n";

            // Get movie dimensions and duration
            echo "\tGetting info: ";

            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime_type = finfo_file($finfo, $video);
            finfo_close($finfo);

            if(!preg_match('/video\/*/', $mime_type)) {
                echo "NOT A VIDEO?\n";
                $failedMovies[] = $movie->toArray();
                return $movie;
            }

            $videoAttributes = $this->getVideoAttributes($video);

            $width = $videoAttributes['width'];
            $height = $videoAttributes['height'];
            $duration = $videoAttributes['secs']
                + ($videoAttributes['mins'] * 60)
                + ($videoAttributes['hours'] * 60 * 60);

            $movie->drive->first()->pivot->width = $width;
            $movie->drive->first()->pivot->height = $height;
            $movie->drive->first()->pivot->duration = $duration;

            echo "Width: $width, Height: $height, Duration: $duration\n";

            return $movie;
        });

        echo "\nInserting movie values...\n\n";

        $media->each(function($movie) use($failedMovies) {
            // Skip any failed movies
            if(in_array($movie->id, array_column($failedMovies, 'id'))) {
                return;
            }

            echo "Inserting ({$movie->id}) {$movie->title} - {$movie->drive->first()->pivot->filename}\n";

            // Insert into files
            $file = new \App\File;
            $file->filename = $movie->drive->first()->pivot->filename;
            $file->width = $movie->drive->first()->pivot->width;
            $file->height = $movie->drive->first()->pivot->height;
            $file->duration = $movie->drive->first()->pivot->duration;
            $file->save();

            // Insert into file_media
            $insert = "
                INSERT INTO file_media
                (
                    media_id,
                    file_id
                )
                VALUES (?, ?, ?, ?)
            ";

            $values = [
                $movie->id,
                $file->id
            ];

            DB::insert($insert, $values);

            // Insert into drive_file
            $insert = "
                INSERT INTO drive_file
                (
                    drive_id,
                    file_id
                )
                VALUES (?, ?, ?, ?)
            ";

            $values = [
                1,
                $file->id
            ];

            DB::insert($insert, $values);
        });

        /*
         * EPISODES
         */
        echo "Processing episodes...\n\n";

        // Get drive_episode contents
        $episodes = \App\Episode::all()->load('drive');

        // Assign video attributes to $episodes
        $episodes->transform(function($episode) use(&$failedEpisodes) {
            $video = '/var/www/pi_theater_2/public/videos/hdd1/shows/'
                . $episode->drive->first()->pivot->filename;

            echo "On file: $video - ";

            if(!file_exists($video)) {
                echo "COULD NOT FIND FILE\n";
                $failedEpisodes[] = $episode->toArray();
                return $episode;
            }

            echo "File found\n";

            // Get episode dimensions and duration
            echo "\tGetting info: ";

            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime_type = finfo_file($finfo, $video);
            finfo_close($finfo);

            if(!preg_match('/video\/*/', $mime_type)) {
                echo "NOT A VIDEO?\n";
                $failedEpisodes[] = $episode->toArray();
                return $episode;
            }

            $videoAttributes = $this->getVideoAttributes($video);

            $width = $videoAttributes['width'];
            $height = $videoAttributes['height'];
            $duration = $videoAttributes['secs']
                + ($videoAttributes['mins'] * 60)
                + ($videoAttributes['hours'] * 60 * 60);

            $episode->drive->first()->pivot->width = $width;
            $episode->drive->first()->pivot->height = $height;
            $episode->drive->first()->pivot->duration = $duration;

            echo "Width: $width, Height: $height, Duration: $duration\n";

            return $episode;
        });

        echo "\nInserting episode values...\n\n";

        $episodes->each(function($episode) use($failedEpisodes) {
            // Skip any failed episodes
            if(in_array($episode->id, array_column($failedEpisodes, 'id'))) {
                return;
            }

            echo "Inserting ({$episode->id}) {$episode->title} - {$episode->drive->first()->pivot->filename}\n";

            // Insert into files
            $file = new \App\File;
            $file->filename = $episode->drive->first()->pivot->filename;
            $file->width = $episode->drive->first()->pivot->width;
            $file->height = $episode->drive->first()->pivot->height;
            $file->duration = $episode->drive->first()->pivot->duration;
            $file->save();

            // Insert into episode_file
            $insert = "
                INSERT INTO episode_file
                (
                    episode_id,
                    file_id
                )
                VALUES (?, ?, ?, ?)
            ";

            $values = [
                $episode->id,
                $file->id
            ];

            DB::insert($insert, $values);

            // Insert into drive_file
            $insert = "
                INSERT INTO drive_file
                (
                    drive_id,
                    file_id
                )
                VALUES (?, ?, ?, ?)
            ";

            $values = [
                1,
                $file->id
            ];

            DB::insert($insert, $values);
        });

        echo "\nFailed movies:\n";

        foreach($failedMovies as $movie) {
            echo "({$movie['id']}) {$movie['title']} - {$movie['drive'][0]['pivot']['filename']}\n";
        }

        echo "\nFailed episodes:\n";

        foreach($failedEpisodes as $episode) {
            echo "({$episode['id']}) {$episode['title']} - {$episode['drive'][0]['pivot']['filename']}\n";
        }
    }

    private function getVideoAttributes($video) {
        $ffmpeg = 'ffmpeg';  // The path to ffmpeg on the server
        $command = $ffmpeg . ' -i ' . $video . ' -vstats 2>&1';
        $output = shell_exec($command);

        $regex_sizes = "/Video: ([^,]*), ([^,]*), ([0-9]{1,4})x([0-9]{1,4})/"; // or : $regex_sizes = "/Video: ([^\r\n]*), ([^,]*), ([0-9]{1,4})x([0-9]{1,4})/"; (code from @1owk3y)

        if (preg_match($regex_sizes, $output, $regs)) {
            $codec = $regs [1] ? $regs [1] : null;
            $width = $regs [3] ? $regs [3] : null;
            $height = $regs [4] ? $regs [4] : null;
        }

        $regex_duration = "/Duration: ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}).([0-9]{1,2})/";

        if (preg_match($regex_duration, $output, $regs)) {
            $hours = $regs [1] ? $regs [1] : null;
            $mins = $regs [2] ? $regs [2] : null;
            $secs = $regs [3] ? $regs [3] : null;
            $ms = $regs [4] ? $regs [4] : null;
        }

        return array('codec' => $codec,
            'width' => $width,
            'height' => $height,
            'hours' => $hours,
            'mins' => $mins,
            'secs' => $secs,
            'ms' => $ms
        );
    }

    private function humanFileSize($bytes, $decimals = 2) {
        $sz = 'BKMGTP';
        $factor = floor((strlen($bytes) - 1) / 3);
        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
    }
}

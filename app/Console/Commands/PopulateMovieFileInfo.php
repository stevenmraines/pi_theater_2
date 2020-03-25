<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PopulateMovieFileInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'files:populateMovies';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'One time command to move info from files tables into drive_media';

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
        $movies =
            DB::table('media')
                ->where('media_type', 'movie')
                ->join('file_media', 'file_media.media_id', '=', 'media.id')
                ->join('files', 'files.id', '=', 'file_media.file_id')
                ->select(['media.*', 'files.width', 'files.height', 'files.duration'])
                ->get();

        $movies->each(function($movie) {
            $update = "
                UPDATE drive_media
                SET
                    width = ?,
                    height = ?,
                    duration = ?
                WHERE media_id = {$movie->id}
            ";

            $values = [
                $movie->width,
                $movie->height,
                $movie->duration
            ];

            DB::update($update, $values);
        });
    }
}

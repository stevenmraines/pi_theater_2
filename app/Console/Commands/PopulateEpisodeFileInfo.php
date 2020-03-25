<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PopulateEpisodeFileInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'files:populateEpisodes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'One time command to move info from files tables into drive_episode';

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
        $episodes =
            DB::table('episodes')
                ->join('episode_file', 'episode_file.episode_id', '=', 'episodes.id')
                ->join('files', 'files.id', '=', 'episode_file.file_id')
                ->select(['episodes.*', 'files.width', 'files.height', 'files.duration'])
                ->get();

        $episodes->each(function($episode) {
            $update = "
                UPDATE drive_episode
                SET
                    width = ?,
                    height = ?,
                    duration = ?
                WHERE episode_id = {$episode->id}
            ";

            $values = [
                $episode->width,
                $episode->height,
                $episode->duration
            ];

            DB::update($update, $values);
        });
    }
}

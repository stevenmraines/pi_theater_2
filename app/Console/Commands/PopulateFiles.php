<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        // TODO get drive_media contents, only care about media_id and filename
        // TODO get drive_episode contents, only care about episode_id and filename
        // TODO get movie dimensions and duration
        // TODO insert into file_media
        // TODO get episode dimensions and duration
        // TODO insert into episode_file
        // TODO insert into drive_file
    }
}

<?php

namespace App\Console\Commands;

use App\Console\Helpers\Validation;
use App\Utilities;
use Illuminate\Console\Command;

class GetVideoAttributes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get-video-attributes
                            {file : The path and filename of the video to get data on}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Uses ffmpeg to dump the attributes of the specified video file to the console';

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
        $errors = Validation::get_errors(
            ['file' => $this->argument('file')],
            ['file' => 'required|string']
        );

        if(!is_null($errors)) {
            Validation::print_errors($errors->get('file'));
            exit(1);
        }

        $file = public_path("videos/" . $this->argument('file'));

        if(!file_exists($file)) {
            die("File not found\n");
        }

        echo Utilities\Video::vstats($file);
    }
}

<?php

namespace App\Console\Commands;

use App\Console\Helpers\MediaIndexing;
use App\Console\Helpers\Validation;
use Illuminate\Console\Command;

class MakeAllMediaIndexing extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:media-all-indexing
                            {file=/home/pi/Documents/indices.json : Path of file to dump the Algolia indexing to}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Dump Algolia indexing data for entire media table into a file';

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

        if(file_exists($this->argument('file'))
                && !$this->confirm('File already exists, do you wish to continue?')) {
            die("Cancelling command\n");
        }

        $media = \App\Media::all();

        $media->transform(function($m) {
            $m['created_at_unix'] = $m->created_at->timestamp;
            $m['updated_at_unix'] = $m->updated_at->timestamp;
            return $m;
        });

        MediaIndexing::write_to_file($this->argument('file'), $media);
    }
}

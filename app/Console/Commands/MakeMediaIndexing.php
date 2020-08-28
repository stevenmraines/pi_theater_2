<?php

namespace App\Console\Commands;

use App\Console\Helpers\MediaIndexing;
use App\Console\Helpers\Validation;
use Illuminate\Console\Command;

class MakeMediaIndexing extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:media-indexing
                            {id : The ID on the media table of the specific row to get indexing data for}
                            {file=/home/pi/Documents/index.json : Path of file to dump the Algolia indexing to}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Dump Algolia indexing data for a specific row of the media table into a file';

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
            [
                'id' => $this->argument('id'),
                'file' => $this->argument('file')
            ],
            [
                'id' => 'required|exists:media',
                'file' => 'required|string'
            ]
        );

        if(!is_null($errors)) {
            Validation::print_errors($errors->get('id'));
            Validation::print_errors($errors->get('file'));
            exit(1);
        }

        if(file_exists($this->argument('file'))
                && !$this->confirm('File already exists, do you wish to continue?')) {
            die('Cancelling command');
        }

        $media = \App\Media::findOrFail($this->argument('id'));

        $media['created_at_unix'] = $media->created_at->timestamp;
        $media['updated_at_unix'] = $media->updated_at->timestamp;

        MediaIndexing::write_to_file($this->argument('file'), $media);
    }
}

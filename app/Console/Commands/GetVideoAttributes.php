<?php

namespace App\Console\Commands;

use App\Drive;
use App\Utilities\VideoMetadataProvider;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class GetVideoAttributes extends Command
{
    const MOVIE_VIDEO_TYPE = 'movie';
    const EPISODE_VIDEO_TYPE = 'episode';
    
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'video:metadata
                            {file : For example "alien.mp4"}'
                            . '{video_type=movie : "movie" or "episode"}'
                            . '{drive=hdd1 : Which hard drive to search}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Uses ffmpeg to show the metadata of the specified video file';

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
        $in = Rule::in([self::MOVIE_VIDEO_TYPE, self::EPISODE_VIDEO_TYPE]);
        
        $validator = Validator::make(
            [
                'file' => $this->argument('file'),
                'video_type' => $this->argument('video_type'),
                'drive' => $this->argument('drive'),
            ],
            [
                'file' => 'required|string',
                'video_type' => ['string', $in],
                'drive' => 'exists:drives,name',
            ]
        );
        
        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $message) {
                $this->error($message);
            }
            exit(1);
        }
        
        $drive = Drive::where('name', $this->argument('drive'))->first();
        
        $path = $drive->movie_directory();
        if ($this->argument('video_type') === self::EPISODE_VIDEO_TYPE) {
            $path = $drive->episode_directory();
        }
        
        $file = public_path() . DIRECTORY_SEPARATOR . $path
            . DIRECTORY_SEPARATOR . $this->argument('file');

        if(!file_exists($file)) {
            $this->error("File $file not found");
            exit(1);
        }

        echo VideoMetadataProvider::vstats($file);
    }
}

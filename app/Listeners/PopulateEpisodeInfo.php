<?php

namespace App\Listeners;

use App\Drive;
use App\DriveEpisode;
use App\Utilities\VideoMetadataProvider;

class PopulateEpisodeInfo
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        /*
         * DriveEpisode
         */
        $drive = $event->drive;
        $filename = $event->request->get('file');
        $path = $drive->episode_directory() . DIRECTORY_SEPARATOR . $filename;
        $attributes = VideoMetadataProvider::getAttributes($path);
        
        (new DriveEpisode([
            'episode_id' => $event->episode->id,
            'drive_id' => $drive->id,
            'filename' => $filename,
            'width' => $attributes['width'],
            'height' => $attributes['height'],
            'duration' => $attributes['duration'],
        ]))->save();
    }
}

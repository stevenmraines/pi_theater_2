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
        $drive = Drive::find($event->request->get('drive_id'));
        $filename = $event->request->get('file');
        $path = implode(DIRECTORY_SEPARATOR, [
            'videos',
            $drive->name,
            Drive::EPISODE_DIRECTORY,
            $filename,
        ]);

        $attributes = VideoMetadataProvider::getAttributes(public_path($path));
        
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

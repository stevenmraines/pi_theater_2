<?php

namespace App\Listeners;

use App\Utilities\Image;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class HandleMediaFiles
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $request = $event->request;
        $media = $event->media;
        
        /*
         *  Handle poster image.
         */
        $posterFilename = $media->poster;
        
        $posterFilepath = implode(DIRECTORY_SEPARATOR, [
            public_path('img'),
            'posters',
            $posterFilename,
        ]);

        // If posterUrl is present then the image needs to be downloaded from the URL
        if(!empty($request->posterUrl)) {
            file_put_contents($posterFilepath, file_get_contents($request->posterUrl));
            // Resize the image with ImageMagick
            exec("convert $posterFilepath -resize 230x345\! $posterFilepath");
        }

        // If no posterUrl, then the uploaded image needs to be stored
        if(empty($request->posterUrl)) {
            $request->poster->storeAs('posters', $posterFilename, 'images');
        }

        // Set permissions
        if (env('APP_ENV', 'production') === 'production') {
            chmod($posterFilepath, 0664);
            // TODO figure out what to do about chown not being permitted
//            chown($posterFilepath, 'pi');
            chgrp($posterFilepath, 'www-data');
        }

        /*
         *  Handle jumbotron image, if any.
         */
        if($request->hasFile('jumbotron')) {
            $jumbotronFilename = $media->jumbotron;
            $request->jumbotron->storeAs('jumbotron', $jumbotronFilename, 'images');

            $jumbotronFilepath = implode(DIRECTORY_SEPARATOR, [
                public_path('img'),
                'jumbotron',
                $jumbotronFilename,
            ]);
            
            // Set permissions
            if (env('APP_ENV', 'production') === 'production') {
                chmod($jumbotronFilepath, 0664);
                // TODO figure out what to do about chown not being permitted
//                chown($jumbotronFilepath, 'pi');
                chgrp($jumbotronFilepath, 'www-data');
            }
        }
    }
}

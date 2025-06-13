<?php

namespace App\Listeners;

use App\Collection;
use App\Drive;
use App\DriveMedia;
use App\Genre;
use App\MovieYear;
use App\Events\MovieUploaded;
use App\Utilities\VideoMetadataProvider;

class PopulateMovieInfo
{
    /**
     * Handle the event.
     *
     * @param  MovieUploaded  $event
     * @return void
     */
    public function handle(MovieUploaded $event)
    {
        /*
         * DriveMedia
         */
        $drive = Drive::find($event->request->get('drive_id'));
        $filename = $event->request->get('file');
        $path = implode(DIRECTORY_SEPARATOR, [
            'videos',
            $drive->name,
            Drive::MOVIE_DIRECTORY,
            $filename,
        ]);

        $attributes = VideoMetadataProvider::getAttributes(public_path($path));
        
        (new DriveMedia([
            'media_id' => $event->media->id,
            'drive_id' => $drive->id,
            'filename' => $filename,
            'width' => $attributes['width'],
            'height' => $attributes['height'],
            'duration' => $attributes['duration'],
        ]))->save();
        
        /*
         * MovieYear
         */
        $event->media->movie_year()->save(
            new MovieYear(['year_released' => $event->request->get('yearReleased')])
        );
        
        /*
         * GenreMedia
         */
        $genres = array_unique($event->request->get('genres'));
        $genreModels = [];
        
        foreach ($genres as $name) {
            $model = Genre::where('name', $name)->first();
            if (! is_null($model)) {
                $genreModels[] = $model;
            } else {
                $genreModels[] = new Genre(['name' => $name]);
            }
        }
        
        $event->media->genres()->saveMany($genreModels);
        
        /*
         * CollectionMedia
         */
        $collections = array_unique($event->request->get('collections'));
        $collectionModels = [];
        
        foreach ($collections as $name) {
            $model = Collection::where('name', $name)->first();
            if (! is_null($model)) {
                $collectionModels[] = $model;
            } else if (! is_null($name)) {
                $collectionModels[] = new Collection(['name' => $name]);
            }
        }
        
        if (count($collectionModels) > 0) {
            $event->media->collections()->saveMany($collectionModels);
        }
    }
}

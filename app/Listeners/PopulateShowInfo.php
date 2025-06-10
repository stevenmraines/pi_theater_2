<?php

namespace App\Listeners;

use App\Collection;
use App\Genre;
use App\ShowYear;

class PopulateShowInfo
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
         * ShowYear
         */
        $event->media->show_year()->save(
            new ShowYear([
                'year_start' => $event->request->get('yearStart'),
                'year_end' => $event->request->get('yearEnd'),
            ])
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

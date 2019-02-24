<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Laravel\Scout\Searchable;

class Collection extends Model
{
    use Searchable;

    public function movies() {
        return $this->belongsToMany('App\Movie', 'collection_movies');
    }

    public function shows() {
        return $this->belongsToMany('App\Show', 'collection_shows');
    }

    public static function recent($limit) {
        // $collectionMoviesIds =
        //     DB::table('collection_movies')
        //         ->orderBy('created_at', 'desc')
        //         ->select('collection_id', 'created_at')
        //         ->get();
        //
        // $uniqueCollectionMoviesIds = $collectionMoviesIds->unique(function($item) {
        //     return $item[]
        // });
        //
        // $collectionShowIds =
        //     DB::table('collection_shows')
        //         ->orderBy('created_at', 'desc')
        //         ->select('collection_id', 'created_at')
        //         ->get();
        //
        // $collectionIds = $collectionMoviesIds->merge($collectionShowIds);
        // return $collectionIds;
    }
}

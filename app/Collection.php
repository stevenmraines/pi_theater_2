<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
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
}

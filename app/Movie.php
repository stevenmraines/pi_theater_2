<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Movie extends Model
{
    use Searchable;

    public function genres() {
		return $this->belongsToMany('App\Genre', 'movie_genres');
	}

    public function collections() {
        return $this->belongsToMany('App\Collection', 'collection_movies');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    /*
     *  Get all movies with the given genre.
     */
    public function movies() {
		return $this->belongsToMany(Movie::class, 'movie_genres', 'genre_id', 'movie_id');
	}

    /*
     *  Get all shows with the given genre.
     */
	public function shows() {
		return $this->belongsToMany(Show::class, 'show_genres', 'genre_id', 'show_id');
	}
}

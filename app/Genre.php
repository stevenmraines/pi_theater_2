<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    public function movies() {
		return $this->belongsToMany('App\Movie', 'movie_genres');
	}

    public function shows() {
		return $this->belongsToMany('App\Show', 'show_genres');
	}
}

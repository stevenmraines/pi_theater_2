<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    public function movies() {
        return $this->belongsToMany(
            Movie::class,
            'collection_movies',
            'collection_id',
            'movie_id'
        );
    }

    public function shows() {
        return $this->belongsToMany(
            Show::class,
            'collection_shows',
            'collection_id',
            'show_id'
        );
    }

    public function episodes() {
        return $this->belongsToMany(
            Episode::class,
            'collection_episodes',
            'collection_id',
            'episode_id'
        );
    }

    public static function recent($limit) {

	}
}

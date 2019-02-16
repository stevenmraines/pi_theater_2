<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Movie extends Model
{
    use Searchable;

    public function genres() {
		return $this->belongsToMany(Genre::class, 'movie_genres', 'movie_id', 'genre_id');
	}

	public static function recent($limit, $offset) {
		return self::orderBy('created_at', 'desc')
				->limit($limit)
				->offset($offset)
        ->get();
	}

    // public function toSearchableArray()
    // {
    //     $array = $this->toArray();
    //     return ['title' => $array['title'], 'summary' => $array['summary']];
    // }
}

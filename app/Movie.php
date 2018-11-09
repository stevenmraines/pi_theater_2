<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    public function genres() {
		return $this->belongsToMany(Genre::class, 'movie_genres', 'movie_id', 'genre_id');
	}

	public static function recent($limit, $offset) {
		return self::orderBy('created_at', 'desc')
				->limit($limit)
				->offset($offset)
                ->get();
	}
}

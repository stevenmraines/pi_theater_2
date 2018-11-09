<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    public function genres() {
		return $this->belongsToMany(Genre::class, 'show_genres', 'show_id', 'genre_id');
	}
	
	public static function recent($limit, $offset) {
		return self::orderBy('created_at', 'desc')
				->limit($limit)
				->offset($offset)
				->get();
	}
}

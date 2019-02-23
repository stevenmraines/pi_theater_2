<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Show extends Model
{
    use Searchable;

    public function genres() {
		return $this->belongsToMany('App\Genre', 'show_genres');
	}

    public function episodes() {
        return $this->hasMany('App\Episode');
    }
}

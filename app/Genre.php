<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Genre extends Model
{
    use Searchable;

    public function media() {
		return $this->belongsToMany('App\Media');
	}
}

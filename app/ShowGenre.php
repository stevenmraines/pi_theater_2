<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShowGenre extends Model
{
    public function shows() {
		return $this->hasMany(Show::class);
	}
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Media extends Model
{
    use Searchable;

    public function genres() {
        return $this->belongsToMany('App\Genre');
    }

    public function episodes() {
        return $this->hasMany('App\Episode', 'media_id', 'id');
    }

    public function collections() {
        return $this->belongsToMany('App\Collection');
    }
}

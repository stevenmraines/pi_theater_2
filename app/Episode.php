<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $with = ['filename'];

    public function filename() {
        return $this->hasOne('App\EpisodeFile');
    }
}

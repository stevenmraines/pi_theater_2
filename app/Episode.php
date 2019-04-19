<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    public function filename() {
        return $this->hasOne('App\EpisodeFile');
    }
}

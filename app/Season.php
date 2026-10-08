<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }

    public function media()
    {
        return $this->hasOne(Media::class, 'id', 'media_id');
    }
}

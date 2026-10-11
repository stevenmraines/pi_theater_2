<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    protected $fillable = [
        'media_id',
        'name',
        'number',
    ];

    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }

    public function media()
    {
        return $this->hasOne(Media::class, 'id', 'media_id');
    }
}

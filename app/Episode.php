<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = [
        'media_id',
        'season',
        'episode_number',
        'title',
        'summary',
    ];
    
    protected $with = ['drive'];
    
    public function show() {
        return $this->hasOne('App\Media', 'id', 'media_id');
    }

    public function drive() {
        return $this->belongsToMany('App\Drive')->withPivot(['filename', 'width', 'height', 'duration']);
    }
}

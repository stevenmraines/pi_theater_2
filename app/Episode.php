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

    public function drive() {
        return $this->belongsToMany('App\Drive')->withPivot(['filename', 'width', 'height', 'duration']);
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = [
        'media_id',
        'season_id',
        'episode_number',
        'title',
        'summary',
    ];
    
    protected $with = ['drive'];

    public function season() {
        return $this->belongsTo(Season::class);
    }
    
    public function show() {
        return $this->hasOne('App\Media', 'id', 'media_id');
    }

    public function drive() {
        // TODO Shouldn't this be belongsTo? Little late to do something about it I guess
        return $this->belongsToMany('App\Drive')->withPivot(['filename', 'width', 'height', 'duration']);
    }
}

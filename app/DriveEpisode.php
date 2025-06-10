<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DriveEpisode extends Model
{
    protected $fillable = [
        'episode_id',
        'drive_id',
        'filename',
        'width',
        'height',
        'duration',
    ];
            
    public $table = 'drive_episode';
}

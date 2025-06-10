<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DriveMedia extends Model
{
    protected $fillable = [
        'media_id',
        'drive_id',
        'filename',
        'width',
        'height',
        'duration',
    ];
    
    public $table = 'drive_media';
}

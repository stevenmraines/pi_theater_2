<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StreamMedia extends Model
{
    public const DAYS_OF_UNIQUE_MEDIA = 3;

    protected $fillable = ['stream_id', 'media_id', 'date'];

    public function stream()
    {
        return $this->hasOne(Stream::class, 'id', 'stream_id');
    }

    public function media()
    {
        return $this->hasOne(Media::class, 'id', 'media_id');
    }
}

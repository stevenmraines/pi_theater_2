<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StreamEpisode extends Model
{
    protected $fillable = ['stream_id', 'episode_id', 'date'];

    public function stream()
    {
        return $this->hasOne(Stream::class, 'id', 'stream_id');
    }

    public function episode()
    {
        return $this->hasOne(Episode::class, 'id', 'episode_id');
    }
}

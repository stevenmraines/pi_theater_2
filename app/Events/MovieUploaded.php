<?php

namespace App\Events;

use App\Media;
use Illuminate\Broadcasting\Channel;
use Illuminate\Http\Request;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MovieUploaded
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public Media $media;
    
    public Request $request;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Media $media, Request $request)
    {
        $this->media = $media;
        $this->request = $request;
    }
}

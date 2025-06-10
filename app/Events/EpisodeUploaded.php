<?php

namespace App\Events;

use App\Episode;
use Illuminate\Broadcasting\Channel;
use Illuminate\Http\Request;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class EpisodeUploaded
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $episode;
    
    public $request;
    
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Episode $episode, Request $request)
    {
        $this->episode = $episode;
        $this->request = $request;
    }
}

<?php

namespace App\Events;

use App\Drive;
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

    public $drive;
    
    public $episode;
    
    public $request;
    
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Drive $drive, Episode $episode, Request $request)
    {
        $this->drive = $drive;
        $this->episode = $episode;
        $this->request = $request;
    }
}

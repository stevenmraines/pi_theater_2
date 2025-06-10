<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\Event' => [
            'App\Listeners\EventListener',
        ],
        'App\Events\MovieUploaded' => [
            'App\Listeners\PopulateMovieInfo',
            'App\Listeners\HandleMediaFiles',
        ],
        'App\Events\ShowUploaded' => [
            'App\Listeners\PopulateShowInfo',
            'App\Listeners\HandleMediaFiles',
        ],
        'App\Events\EpisodeUploaded' => [
            'App\Listeners\PopulateEpisodeInfo',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}

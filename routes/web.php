<?php

use Illuminate\Http\Request;

use App\Drive;

Auth::routes();

Route::get('/{home?}', function() {
    $user = auth()->user();

    if(!is_null($user)) {
        $user
            ->load('history_media')
            ->load('episode_history')
            ->load('watchlist');
    }

    $recentMovies =
        App\Media
            ::where('media_type', '=', 'movie')
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();

    $recentShows =
        App\Media
            ::where('media_type', '=', 'show')
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();
    
    $drivePaths = [];
    
    Drive::all()->each(function ($drive) use (&$drivePaths) {
        $drivePaths[$drive->name] = [
            'movie_directory' => $drive->movie_directory(),
            'episode_directory' => $drive->episode_directory(),
        ];
    });

    $initialState = [
        'algoliaKeys' => (object) [
            'appId' => config('app.algolia_app_id'),
            'apiKey' => config('app.algolia_api_key')
        ],
        'environment' => env('APP_ENV', 'production'),
        'genres' => App\Genre::orderBy('name')->get(),
        'collections' => App\Collection::all(),
        'recentEpisodes' => App\Media::recentEpisodes(),
        'recentMovies' => $recentMovies,
        'recentShows' => $recentShows,
        'recentSpotlight' => App\Media::spotlight(),
        'user' => $user,
        'paths' => (object) [
            'img' => asset('img'),
            'banners' => asset('img/banners'),
            'jumbotron' => asset('img/jumbotron'),
            'logos' => asset('img/logos'),
            'posters' => asset('img/posters'),
            'drivePaths' => $drivePaths,
        ],
    ];

    return view('browse')->with('initialState', json_encode($initialState));

})->name('browse')->where('home', 'home');

Route::get('/upload', 'AuthViewController@upload')->name('upload');

Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\RegisterController@register');

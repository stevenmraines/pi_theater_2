<?php

use Illuminate\Http\Request;

Auth::routes();

Route::get('/{home?}', function() {
    $user = auth()->user();

    if(!is_null($user)) {
        $user
            ->load('history_movie')
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

    $initialState = [
        'algoliaKeys' => (object) [
            'appId' => config('app.algolia_app_id'),
            'apiKey' => config('app.algolia_api_key')
        ],
        'genres' => App\Genre::all(),
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
            'videos' => asset('videos')
        ]
    ];

    return view('browse')->with('initialState', json_encode($initialState));

})->name('browse')->where('home', 'home');

Route::get('/upload', 'AuthViewController@upload')->name('upload');

Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\RegisterController@register');

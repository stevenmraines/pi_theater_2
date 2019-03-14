<?php

use Illuminate\Http\Request;

Auth::routes();

Route::get('/{home?}', function() {
    $user = auth()->user();

    if(!is_null($user)) {
        $user->load('history')->load('watchlist');
    }

    $initialState = [
        'genres' => App\Genre::all(),
        'collections' => App\Collection::all(),
        'recentCollections' => App\Collection::recent(3),
        'recentEpisodes' => App\Media::recentEpisodes(),
        'user' => $user,
    ];

    return view('browse')
        ->with('initialState', json_encode($initialState));

})->name('browse')->where('home', 'home');

Route::get('/upload', 'AuthViewController@upload')->name('upload');

Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\LoginController@register');

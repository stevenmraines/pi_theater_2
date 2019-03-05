<?php

use Illuminate\Http\Request;

Auth::routes();

Route::get('/{home?}', function() {
    $initialState = [
        'genres' => App\Genre::all(),
        'collections' => App\Collection::all(),
        'recentCollections' => App\Collection::recent(3),
    ];
    return view('browse')->with('initialState', json_encode($initialState));
})->where('home', 'home');

Route::get('/upload', 'AuthViewController@upload');

Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\LoginController@register');

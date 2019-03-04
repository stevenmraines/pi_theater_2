<?php

use Illuminate\Http\Request;

Auth::routes();

Route::get('/', function() {
    $initialState = [
        'genres' => App\Genre::all(),
        'collections' => App\Collection::all()
    ];
    return view('home')->with('initialState', json_encode($initialState));
});

Route::get('/upload', 'AuthViewController@upload');

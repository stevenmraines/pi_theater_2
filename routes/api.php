<?php

use Illuminate\Http\Request;

Route::resource('collection', 'CollectionController');
Route::resource('genre', 'GenreController');
Route::resource('media', 'MediaController');
Route::resource('user', 'UserController');

Route::post('/watchlist/add/{userId}/{mediaId}', 'WatchlistController@add');
Route::post('/watchlist/remove/{userId}/{mediaId}', 'WatchlistController@remove');

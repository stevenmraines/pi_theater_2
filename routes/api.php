<?php

use Illuminate\Http\Request;

Route::resource('collection', 'CollectionController');
Route::resource('genre', 'GenreController');
Route::resource('media', 'MediaController');

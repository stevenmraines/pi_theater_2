<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});

/*
 * Movie routes
 */
Route::get('/movie/recent/{limit}/{offset}', function($limit, $offset) {
  return App\Movie::recent($limit, $offset);
});

Route::get('/movie/recentGenre/{limit}/{offset}/{genre}', 'MoviesController@recentGenre');

/*
 * Show routes
 */
Route::get('/show/recent/{limit}/{offset}', function($limit, $offset) {
  return App\Show::orderBy('created_at', 'desc')->limit($limit)->offset($offset)->get();
});

/*
 * Genre routes
 */
Route::get('/genre/allGenres', function() {
  return App\Genre::orderBy('name', 'asc')->get();
});

Route::get('/genre/allMedia/{id}', function($id) {
  return App\Genre::find($id)->load('movies')->load('shows');
});

/*
 * Collection routes
 */
Route::get('/collection/allCollections', function() {
  return App\Collection::get();
});

Route::get('/collection/recent/{limit}', function($limit) {
  return App\Collection::limit($limit)->get();
});

Route::get('/collection/allMedia/{id}', 'CollectionsController@allMedia');

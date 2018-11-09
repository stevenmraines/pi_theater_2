<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*
 * Movie routes
 */
Route::get('/movie/info/{id}', 'MoviesController@info');
Route::get('/movie/recent/{limit}/{offset}', 'MoviesController@recent');
Route::get('/movie/year/{year}', 'MoviesController@year');
Route::get('/movie/genres/{id}', 'MoviesController@genres');

/*
 * Show routes
 */
Route::get('/show/info/{id}', 'ShowsController@info');
Route::get('/show/recent/{limit}/{offset}', 'ShowsController@recent');
Route::get('/show/year/{year}', 'ShowsController@year');
Route::get('/show/genres/{id}', 'ShowsController@genres');

/*
 * Genre routes
 */
Route::get('/genre/movies/{id}', 'GenresController@movies');
Route::get('/genre/shows/{id}', 'GenresController@shows');
Route::get('/genre/allMedia/{id}', 'GenresController@allMedia');
Route::get('/genre/movies/recent/{id}/{limit}', 'GenresController@recent_movies');
Route::get('/genre/shows/recent/{id}/{limit}', 'GenresController@recent_shows');

/*
 * Collection routes
 */
Route::get('/collection/movies/{id}', 'CollectionsController@movies');
Route::get('/collection/shows/{id}', 'CollectionsController@shows');
Route::get('/collection/episodes/{id}', 'CollectionsController@episodes');
Route::get('/collection/allMedia/{id}', 'CollectionsController@allMedia');

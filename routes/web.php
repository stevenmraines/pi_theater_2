<?php

/*
 * "Browse" page, AKA the home page
 */
Route::get('/', 'ViewController@browse');

/*
 * Movie page
 */
Route::get('/theater/movie/{movie_id}', 'ViewController@movieTheater');
Route::get('/movie/info/{id}', 'MoviesController@info');

/*
 * Show page
 */
Route::get('/show/info/{id}', 'ShowsController@info');
Route::get('/show/episodes/{id}/{season}', 'ShowsController@episodes');

/*
 * Episode page
 */
Route::get('/theater/episode/{episode_id}', 'ViewController@episodeTheater');

/*
 * Upload content admin page
 */
Route::get('/upload', 'AuthViewController@upload')->middleware('admin');

/*
 * User
 */
Route::get('/user/watchlist/allMedia', 'UsersController@allMedia');
Route::get('/user/watchlist/addMovie/{id}', 'UsersController@addMovieToWatchlist');
Route::get('/user/watchlist/removeMovie/{id}', 'UsersController@removeMovieFromWatchlist');

/*
 * Auth
 */
Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\LoginController@register');

/*
 * Default Laravel routes
 */
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

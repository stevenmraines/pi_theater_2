<?php

use Illuminate\Http\Request;

/*
 * "Browse" page, AKA the home page
 */
Route::get('/', function() {
  return view('browse');
});

/*
 * Movies
 */
Route::get('/movie/info/{id}', 'MoviesController@info');

Route::get('/movie/search', function(Request $request) {
  return App\Movie::where('title', 'LIKE', "%{$request->input('query')}%")->get();
});

/*
 * Shows
 */
Route::get('/show/info/{id}', 'ShowsController@info');

Route::get('/show/episodes/{id}/{season}', function($id, $season) {
  return App\Show::episodes($id, $season);
});

/*
 * Upload content admin page
 */
Route::get('/upload', 'AuthViewController@upload')->middleware('admin');

/*
 * User
 */
Route::get('/user/watchlist/allMedia', 'UsersController@allMedia');

Route::get('/user/watchlist/addMovie/{id}', function($id) {
  return App\WatchlistMovie::add($id);
});

Route::get('/user/watchlist/removeMovie/{id}', function($id) {
  return App\WatchlistMovie::remove($id);
});

Route::get('/user/watchlist/addShow/{id}', function($id) {
  return App\WatchlistShow::add($id);
});

Route::get('/user/watchlist/removeShow/{id}', function($id) {
  return App\WatchlistShow::remove($id);
});

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

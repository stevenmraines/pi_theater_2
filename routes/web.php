<?php

/*
 * "Browse" page, AKA the home page
 */
Route::get('/', 'ViewController@browse');

/*
 * Movie page
 */
Route::get('/theater/movie/{movie_id}', 'ViewController@movieTheater');

/*
 * Episode page
 */
Route::get('/theater/episode/{episode_id}', 'ViewController@episodeTheater');

/*
 * Upload content admin page
 */
Route::get('/upload', 'AuthViewController@upload')->middleware('admin');

/*
 * Default Laravel routes
 */
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

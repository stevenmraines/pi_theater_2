<?php

/*
 * "Browse" page, AKA the home page
 */
Route::get('/', function () {
	$genres			= App\Genre::orderBy('name', 'asc')->get();
	$collections	= App\Collection::limit(3)->get();
	$recent_movies	= App\Movie::recent(10, 0);
	$recent_shows	= App\Show::recent(10, 0);
	// $new_episodes	=
    return view('browse', compact([
		'genres',
		'collections',
		'recent_movies',
		'recent_shows'
	]));
});

/*
 * Movie page
 */
Route::get('/theater/movie/{movie_id}', function($movie_id) {
	$movie = App\Movie::find($movie_id);
	return view('theater.movie', compact('movie'));
});

/*
 * Episode page
 */
Route::get('/theater/episode/{episode_id}', function($episode_id) {
	$episode		= App\Episode::find($episode_id);
//	$next_episode	= $episode->next($episode_id);
	$show			= App\Show::find($episode->show_id)->title;
	return view('theater.episode', compact(['episode', 'show']));
});

/*
 * Update tables admin page
 */
Route::get('/upload', function() {
	return view('admin.upload');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

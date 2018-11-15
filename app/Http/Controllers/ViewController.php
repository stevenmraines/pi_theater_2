<?php

namespace App\Http\Controllers;

use App\Collection;
use App\Genre;
use App\Movie;
use App\Show;
use Illuminate\Http\Request;

/*
 * This controller will return views accessible by anyone
 */
class ViewController extends Controller
{
    public function browse() {
        $genres			= Genre::orderBy('name', 'asc')->get();
    	$collections	= Collection::limit(3)->get();
    	$recent_movies	= Movie::recent(10, 0);
    	$recent_shows	= Show::recent(10, 0);
        return view('browse', compact([
    		'genres',
    		'collections',
    		'recent_movies',
    		'recent_shows'
    	]));
    }

    public function movieTheater($id) {
        $movie = Movie::find($id);
    	return view('theater.movie', compact('movie'));
    }

    public function episodeTheater($id) {
        $episode		= Episode::find($id);
    //	$next_episode	= $episode->next($episode_id);
    	$show			= Show::find($episode->show_id)->title;
    	return view('theater.episode', compact(['episode', 'show']));
    }
}

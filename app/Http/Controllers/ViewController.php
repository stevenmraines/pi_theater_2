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
        return view('browse');
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

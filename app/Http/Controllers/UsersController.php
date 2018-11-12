<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Movie;
use App\Show;
use App\WatchlistMovie;
use App\WatchlistShow;

class UsersController extends Controller
{
    public function watchlistMovies($id) {
        $movie_ids = WatchlistMovie::where('user_id', $id)->get(['movie_id']);
		return Movie::whereIn('id', $movie_ids)->get();
	}

    public function watchlistShows($id) {
        $show_ids = WatchlistShow::where('user_id', $id)->get(['show_id']);
		return Show::whereIn('id', $show_ids)->get();
	}
}

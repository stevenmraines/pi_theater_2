<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Movie;
use App\Show;
use App\WatchlistMovie;
use App\WatchlistShow;

class UsersController extends Controller
{
    private function movies() {
        $movie_ids = WatchlistMovie::where('user_id', auth()->id())->get(['movie_id']);
		return Movie::whereIn('id', $movie_ids)->get();
	}

    private function shows() {
        $show_ids = WatchlistShow::where('user_id', auth()->id())->get(['show_id']);
		return Show::whereIn('id', $show_ids)->get();
	}

    public function allMedia() {
        if(auth()->check()) {
            return [
                'movies'    => $this->movies(),
                'shows'     => $this->shows()
            ];
        }
        return [];
    }

    public function addMovieToWatchlist($movie_id) {
        return WatchlistMovie::add($movie_id);
    }

    public function removeMovieFromWatchlist($movie_id) {
        return WatchlistMovie::remove($movie_id);
    }
}

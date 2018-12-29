<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Movie;
use App\Show;
use App\WatchlistMovie;
use App\WatchlistShow;

class UsersController extends Controller
{
  public function allMedia() {
    if(auth()->check()) {
      $movie_ids = WatchlistMovie::where('user_id', auth()->id())
        ->get(['movie_id']);

      $movies = Movie::whereIn('id', $movie_ids)->get();

      $show_ids = WatchlistShow::where('user_id', auth()->id())
        ->get(['show_id']);

      $shows = Show::whereIn('id', $show_ids)->get();

      return [
        'movies'  => $movies,
        'shows'   => $shows
      ];
    }
    
    return [];
  }
}

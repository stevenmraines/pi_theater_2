<?php

namespace App\Http\Controllers;

use App\Movie;
use App\WatchlistMovie;

class MoviesController extends Controller
{
  public function info($id) {
    $info                   = Movie::find($id)->load('genres');
    $info['logged']         = auth()->check();
    $info['inWatchlist']    = false;
    if($info['logged']) {
      $info['inWatchlist'] = WatchlistMovie::where('movie_id', $id)
        ->where('user_id', auth()->id())
        ->count() > 0;
    }
		return $info;
	}

  public function recentGenre($limit, $offset, $genre) {
    return Movie::join('movie_genres', 'movies.id', '=', 'movie_genres.movie_id')
      ->where('movie_genres.genre_id', $genre)
      ->orderBy('movies.created_at', 'desc')
      ->limit($limit)
      ->offset($offset)
      ->get();
  }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Movie;

class MoviesController extends Controller
{
    public function info($id) {
        $info           = Movie::find($id)->load('genres');
        $info['logged'] = Auth::check();
		return $info;
	}

	public function recent($limit, $offset) {
		return Movie::recent($limit, $offset);
	}

	public function year($year) {
		return Movie::where('year', $year)->get();
	}

	public function genres($id) {
		return Movie::find($id)->load('genres');
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

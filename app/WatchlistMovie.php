<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class WatchlistMovie extends Model
{
    public static function add($movie_id) {
        if(Auth::check()) {
            $addition           = new WatchlistMovie;
            $addition->user_id  = auth()->user()->id;
            $addition->movie_id = $movie_id;
            $addition->save();
            return ['success' => true];
        }
        return ['success' => false];
    }

    public static function remove($movie_id) {
        if(Auth::check()) {
            WatchlistMovie::where('user_id', auth()->user()->id)
                ->where('movie_id', $movie_id)
                ->delete();
            return ['success' => true];
        }
        return ['success' => false];
    }
}

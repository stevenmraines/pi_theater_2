<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WatchlistMovie extends Model
{
  public static function add($id) {
    if(auth()->check()) {
      $addition           = new WatchlistMovie;
      $addition->user_id  = auth()->id();
      $addition->movie_id = $id;
      $addition->save();
      return ['success' => true];
    }
    return ['success' => false];
  }

  public static function remove($id) {
    if(auth()->check()) {
      WatchlistMovie::where('user_id', auth()->id())
        ->where('movie_id', $id)
        ->delete();
      return ['success' => true];
    }
    return ['success' => false];
  }
}

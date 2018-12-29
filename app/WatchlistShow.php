<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WatchlistShow extends Model
{
  public static function add($id) {
    if(auth()->check()) {
      $addition           = new WatchlistShow;
      $addition->user_id  = auth()->id();
      $addition->show_id  = $id;
      $addition->save();
      return ['success' => true];
    }
    return ['success' => false];
  }

  public static function remove($id) {
    if(auth()->check()) {
      WatchlistShow::where('user_id', auth()->id())
        ->where('show_id', $id)
        ->delete();
      return ['success' => true];
    }
    return ['success' => false];
  }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Episode extends Model
{
  public static function recent($limit, $offset) {
		return DB::table('episodes')
        ->join('shows', 'shows.id', '=', 'episodes.show_id')
        ->select('shows.*')
        ->distinct()
        ->orderBy('episodes.created_at', 'desc')
        ->limit($limit)
        ->offset($offset)
				->get();
	}
}

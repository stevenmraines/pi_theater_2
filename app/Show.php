<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Episode;
use Laravel\Scout\Searchable;

class Show extends Model
{
    use Searchable;

  public function genres() {
		return $this->belongsToMany(Genre::class, 'show_genres', 'show_id', 'genre_id');
	}

  public static function episodes($id, $season = 1) {
		return Episode::where('show_id', $id)
        ->where('season', $season)
        ->orderBy('episode', 'asc')
        ->get();
	}

  public static function seasons($id) {
		return Episode::select('season')
        ->where('show_id', $id)
        ->orderBy('season', 'asc')
        ->distinct()
        ->pluck('season')
        ->toArray();
	}

	public static function recent($limit, $offset) {
		return self::orderBy('created_at', 'desc')
				->limit($limit)
				->offset($offset)
				->get();
	}
}

<?php

namespace App\Http\Controllers;

use App\Show;
use App\WatchlistMovie;

class ShowsController extends Controller
{
  public function info($id) {
    $info                   = Show::find($id)->load('genres');
    $info['seasons']        = Show::seasons($id);
    $info['episodes']       = Show::episodes($id, $info['seasons'][0]);
    $info['logged']         = auth()->check();
    $info['inWatchlist']    = false;
    if($info['logged']) {
        $info['inWatchlist'] = WatchlistShow::where('show_id', $id)
            ->where('user_id', auth()->id())
            ->count() > 0;
    }
		return $info;
	}

  public function episodes($id, $season) {
    return Show::episodes($id, $season);
  }

	public function recent($limit, $offset) {
		return Show::orderBy('created_at', 'desc')->limit($limit)->offset($offset)->get();
	}

	public function year($year) {
		return Show::where('year', $year)->get();
	}

	public function genres($id) {
		return Show::find($id)->load('genres');
	}
}

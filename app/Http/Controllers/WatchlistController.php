<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WatchlistController extends Controller
{
    public function add($userId, $mediaId) {
        $user = \App\User::find($userId)->load('watchlist')->load('history');
        $ids = $user->watchlist->pluck('id')->toArray();
        $ids[] = $mediaId;
        $user->watchlist()->sync($ids);
        return \App\User::find($userId)->load('history')->load('watchlist');
    }

    public function remove($userId, $mediaId) {
        $user = \App\User::find($userId)->load('watchlist')->load('history');
        $ids = $user->watchlist->pluck('id')->toArray();
        $key = array_search($mediaId, $ids);
        if($key >= 0) {
            unset($ids[$key]);
            $user->watchlist()->sync($ids);
        }
        return \App\User::find($userId)->load('history')->load('watchlist');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WatchlistController extends Controller
{
    public function add($userId, $mediaId) {
        $user = \App\User::find($userId)->load('watchlist');

        if(!in_array($mediaId, $user->watchlist->pluck('id')->toArray())) {
            return 'add';
        }

        return 'no add';
    }

    public function remove($userId, $mediaId) {

    }
}

<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WatchlistController extends Controller
{
    public function add($userId, $mediaId) {
        User::find($userId)
            ->watchlist()
            ->syncWithoutDetaching($mediaId);

        return
            User
                ::find($userId)
                ->load('watchlist')
                ->load('episode_history')
                ->load('history_movie');
    }

    public function remove($userId, $mediaId) {
        User::find($userId)
            ->watchlist()
            ->detach($mediaId);

        return
            User
                ::find($userId)
                ->load('watchlist')
                ->load('episode_history')
                ->load('history_movie');
    }
}

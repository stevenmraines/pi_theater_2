<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function update($progress, $userId, $mediaId, $episodeId = 0) {
        $user = User::find($userId);

        if($episodeId > 0) {
            $user
                ->episode_history()
                ->syncWithoutDetaching($episodeId);

            $user
                ->episode_history()
                ->updateExistingPivot($episodeId, ['progress' => $progress]);
        }

        if($episodeId == 0) {
            $user
                ->history_movie()
                ->syncWithoutDetaching($mediaId);

            $user
                ->history_movie()
                ->updateExistingPivot($mediaId, ['progress' => $progress]);
        }

        return
            User
                ::find($userId)
                ->load('history_movie')
                ->load('episode_history')
                ->load('watchlist');
    }

    // public function finish($userId, $mediaId, $episodeId) {
    //     User::find($userId)
    //         ->history()
    //         ->detach($mediaId);
    //
    //     return User::find($userId)->load('history')->load('watchlist');
    // }
}

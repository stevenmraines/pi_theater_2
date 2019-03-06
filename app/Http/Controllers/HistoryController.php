<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function update($userId, $mediaId, $progress) {
        $user = User::find($userId);
        
        $user
            ->history()
            ->syncWithoutDetaching($mediaId);

        $user
            ->history()
            ->updateExistingPivot($mediaId, ['progress' => $progress]);

        return User::find($userId)->load('history')->load('watchlist');
    }

    public function finish($userId, $mediaId) {
        User::find($userId)
            ->history()
            ->detach($mediaId);

        return User::find($userId)->load('history')->load('watchlist');
    }
}

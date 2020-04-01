<?php

namespace App\Http\Controllers;

use App\Episode;
use App\Media;
use App\User;
use Illuminate\Http\Request;

/**
 * Class HistoryController
 * @package App\Http\Controllers
 *
 * Updates the User's viewing history of a movie, show, or episode of a show.
 */
class HistoryController extends Controller
{

    /**
     * Removes an episode of a show from a user's history.
     *
     * @param int $userId The ID of the user whose history should be updated.
     * @param int $episodeId The ID of the episode the user has been watching.
     * @return mixed The refreshed User object.
     */
    public function finishEpisode($userId, $episodeId)
    {
        /*
         * This method is currently unused because I don't think I
         * ever really need to remove episode history, just update it.
         */
        User::find($userId)
            ->episode_history()
            ->detach($episodeId);

        return
            User::find($userId)
                ->load('episode_history')
                ->load('history_media')
                ->load('watchlist');
    }

    /**
     * Removes a movie or show from a user's history.
     *
     * @param int $userId The ID of the user whose history should be updated.
     * @param int $mediaId The ID of the movie or show the user has been watching.
     * @return mixed The refreshed User object.
     */
    public function finishMovie($userId, $mediaId)
    {
        User::find($userId)
            ->history_media()
            ->detach($mediaId);

        return
            User::find($userId)
                ->load('episode_history')
                ->load('history_media')
                ->load('watchlist');
    }

    /**
     * @param int $progress The user's viewing progress in seconds.
     * @param int $userId The ID of the user whose history should be updated.
     * @param int $mediaId The ID of the movie or show the user has been watching.
     * @param int $episodeId The ID of the episode the user has been watching.
     * @return mixed The refreshed User object.
     */
    public function update($progress, $userId, $mediaId, $episodeId = 0)
    {
        $user = User::find($userId);
        $media = Media::find($mediaId)->load('drive');

        // If it's a movie and they're done with 95% or more of it, remove it
        if(
            $media->media_type === 'movie'
            && isset($media->drive[0]->pivot->duration)
            && $media->drive[0]->pivot->duration > 0
            && ( $progress / $media->drive[0]->pivot->duration ) * 100 >= 95
        ) {
            return $this->finishMovie($userId, $mediaId);
        }

        if($episodeId > 0) {
            // Update the episode history
            $user
                ->episode_history()
                ->syncWithoutDetaching($episodeId);

            $user
                ->episode_history()
                ->updateExistingPivot($episodeId, ['progress' => $progress]);
        }

        // Update the movie / show history
        $user
            ->history_media()
            ->syncWithoutDetaching($mediaId);

        $user
            ->history_media()
            ->updateExistingPivot($mediaId, ['progress' => $progress]);

        // Return the User object with the newly updated history data
        return
            User
                ::find($userId)
                ->load('episode_history')
                ->load('history_media')
                ->load('watchlist');
    }

}

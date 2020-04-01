<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function episode_history() {
        return
            $this
                ->belongsToMany('App\Episode', 'episode_history', 'user_id', 'episode_id')
                ->with('drive')
                ->withPivot('progress')
                ->withPivot('updated_at')
                ->orderBy('episode_history.updated_at', 'DESC');
    }

    public function history_media() {
        return
            $this
                ->belongsToMany('App\Media', 'history_media', 'user_id', 'media_id')
                ->with('drive')
                ->withPivot('progress')
                ->withPivot('updated_at')
                ->orderBy('history_media.updated_at', 'DESC');
    }

    public function watchlist() {
        return
            $this
                ->belongsToMany('App\Media', 'user_watchlist', 'user_id', 'media_id')
                ->orderBy('user_watchlist.created_at', 'desc');
    }
}

<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    public function historyMovies() {
        return $this->belongsToMany('App\Movie', 'history_movies');
    }

    public function historyEpisodes() {
        return $this->belongsToMany('App\Episode', 'history_episodes');
    }

    public function watchlistMovies() {
        return $this->belongsToMany('App\Movie', 'watchlist_movies');
    }

    public function watchlistShows() {
        return $this->belongsToMany('App\Show', 'watchlist_shows');
    }

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
}

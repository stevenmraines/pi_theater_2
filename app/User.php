<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    public function history() {
        return
            $this
                ->belongsToMany('App\Media', 'history_user', 'user_id', 'media_id')
                ->withPivot('progress');
    }

    public function watchlist() {
        return $this->belongsToMany('App\Media', 'user_watchlist', 'user_id', 'media_id');
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

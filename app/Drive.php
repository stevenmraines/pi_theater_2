<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drive extends Model
{
    public function media() {
        return $this->belongsToMany('App\Media')->withPivot('filename');
    }

    public function episodes() {
        return
            $this
                ->belongsToMany('App\Episode', 'drive_id')
                ->withPivot('filename');
    }
}

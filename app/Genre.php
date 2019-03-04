<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Genre extends Model
{
    use Searchable;

    public function media() {
		return $this->belongsToMany('App\Media');
	}

    public function toSearchableArray() {
        $array = $this->toArray();

        $array['created_at_unix'] = $this->created_at->timestamp;
        $array['updated_at_unix'] = $this->updated_at->timestamp;

        return $array;
    }
}

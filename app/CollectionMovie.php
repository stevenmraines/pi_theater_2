<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollectionMovie extends Model
{
    public static function recent($limit) {
		$ids = self::orderBy('created_at', 'desc')
				->limit($limit)
				->distinct()
				->get('collection_id');
		//what to do now?
	}
}

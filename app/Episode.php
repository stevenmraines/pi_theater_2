<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
  public static function recent($limit, $offset) {
		return self::orderBy('created_at', 'desc')
				->limit($limit)
				->offset($offset)
				->get();
	}
}

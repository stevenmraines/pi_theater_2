<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Laravel\Scout\Searchable;

class Collection extends Model
{
    use Searchable;

    public function media() {
        
    }

    public static function recent($limit) {

    }
}

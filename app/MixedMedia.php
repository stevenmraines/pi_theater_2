<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class MixedMedia extends Model
{
    use Searchable;
    protected $table = 'mixed_media';
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class MovieYear extends Pivot
{
    public $table = 'movie_year';
}

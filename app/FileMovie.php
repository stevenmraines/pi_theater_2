<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class FileMovie extends Pivot
{
    public $table = 'file_movie';
}

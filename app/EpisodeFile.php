<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class EpisodeFile extends Pivot
{
    public $table = 'episode_file';
}

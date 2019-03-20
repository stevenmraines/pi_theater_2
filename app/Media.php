<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Laravel\Scout\Searchable;

class Media extends Model
{
    use Searchable;

    public function genres() {
        return $this->belongsToMany('App\Genre');
    }

    public function episodes() {
        return $this->hasMany('App\Episode', 'media_id', 'id');
    }

    public function collections() {
        return $this->belongsToMany('App\Collection');
    }

    public static function recentEpisodes() {
        $query = "
            SELECT
                MAX(e.created_at) as 'newest_episode',
                m.*
            FROM media m
            LEFT JOIN episodes e ON e.media_id = m.id
            WHERE m.media_type = 'show'
            GROUP BY
                m.id,
                m.media_type,
                m.title,
                m.summary,
                m.notes,
                m.poster,
                m.year_start,
                m.year_end,
                m.created_at,
                m.updated_at
            ORDER BY newest_episode DESC
        ";

        $ids = collect(DB::select($query))->pluck('id')->toArray();

        return
            self
                ::with('genres')
                ->with('episodes')
                ->where('media_type', '=', 'show')
                ->orderByRaw('FIELD(id, '. implode(',', $ids) .')')
                ->get();
    }

    public function toSearchableArray() {
        $array = $this->toArray();

        $array['created_at_unix'] = $this->created_at->timestamp;
        $array['updated_at_unix'] = $this->updated_at->timestamp;

        return $array;
    }
}

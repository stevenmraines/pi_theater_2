<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Laravel\Scout\Searchable;

class Media extends Model
{
    use Searchable;

    public function collections() {
        return $this->belongsToMany('App\Collection');
    }

    public function drive() {
        return $this->belongsToMany('App\Drive')->withPivot(['filename', 'width', 'height', 'duration']);
    }

    public function episodes() {
        return $this->hasMany('App\Episode', 'media_id', 'id');
    }

    public function genres() {
        return $this->belongsToMany('App\Genre')->orderBy('name');
    }

    public function movie_year() {
        return $this->hasOne('App\MovieYear');
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
                m.jumbotron,
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

    public function show_year() {
        return $this->hasOne('App\ShowYear');
    }

    public static function spotlight() {
        return
            self
                ::where('jumbotron', '!=', '')
                ->orderBy('created_at', 'desc')
                ->limit(3)
                ->get();
    }

    public function toSearchableArray() {
        $array = $this->toArray();

        $array['created_at_unix'] = $this->created_at->timestamp;
        $array['updated_at_unix'] = $this->updated_at->timestamp;

        return $array;
    }
}

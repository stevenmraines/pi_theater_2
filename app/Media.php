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
            select max(e.created_at) as 'newest_episode', m.*
            from media m
            left join episodes e on e.media_id = m.id
            where
            m.media_type = 'show'
            group by
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
            order by newest_episode desc
        ";
        // Thanks for this ridiculous group by Laravel...
        // return
        //     DB::table('media')
        //         ->join('episodes', 'episodes.media_id', '=', 'media.id')
        //         ->select('media.*', DB::raw('max(episodes.created_at) as newest_episode'))
        //         ->where('media.media_type', "'show'")
        //         ->groupBy(
        //             'media.id',
        //             'media.media_type',
        //             'media.title',
        //             'media.summary',
        //             'media.notes',
        //             'media.poster',
        //             'media.year_start',
        //             'media.year_end',
        //             'media.created_at',
        //             'media.updated_at'
        //         )
        //         ->orderBy('newest_episode', 'desc')
        //         ->get();

        $ids = collect(DB::select($query))->pluck('id')->toArray();

        return self::with('genres')->with('episodes')->where('media_type', '=', 'show')->orderByRaw('FIELD(id, '. implode(',', $ids) .')')->get();

            // self::where('media_type', '=', '"show"')
            //     ->with('genres')
            //     ->with(['episodes' => function($query) {
            //         $query->orderBy('created_at', 'desc');
            //     }])
            //     ->get();
    }

    public function toSearchableArray() {
        $array = $this->toArray();

        $array['created_at_unix'] = $this->created_at->timestamp;
        $array['updated_at_unix'] = $this->updated_at->timestamp;

        return $array;
    }
}

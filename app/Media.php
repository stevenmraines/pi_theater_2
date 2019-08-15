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
        return $this->belongsToMany('App\Drive')->withPivot('filename');
    }

    public function episodes() {
        return $this->hasMany('App\Episode', 'media_id', 'id');
    }

    public function genres() {
        return $this->belongsToMany('App\Genre');
    }

    public static function pending($drive) {
        $pending = [
            'movies' => [],
            'episodes' => [],
            'shows' => [],
        ];

        // Scan for new movies
        $movies = new \DirectoryIterator(
            public_path() . '/video/' . $drive . '/movies'
        );

        foreach($movies as $movie) {
            if($movie->isDot() || $movie->isDir()) {
                continue;
            }

            if(!in_array($movie->getFilename(), $pending['movies'])) {
                $pending['movies'][] = $movie->getFilename();
            }
        }

        // Scan for new episodes
        $episodes = new \DirectoryIterator(
            public_path() . '/video/' . $drive . '/shows'
        );

        foreach($episodes as $episode) {
            if($episode->isDot() || $episode->isDir()) {
                continue;
            }

            if(!in_array($episode->getFilename(), $pending['episodes'])) {
                $pending['episodes'][] = $episode->getFilename();
            }
        }

        // Remove filenames that are already accounted for
        $processed_movies =
            Drive
                ::where('name', $drive)
                ->get()
                ->load('media')
                ->first()
                ->media
                ->pluck('pivot')
                ->pluck('filename')
                ->toArray();

        $pending['movies'] = array_values(
            array_diff($pending['movies'], $processed_movies)
        );

        $processed_episodes =
            Drive
                ::where('name', $drive)
                ->get()
                ->load('episodes')
                ->first()
                ->episodes
                ->pluck('pivot')
                ->pluck('filename')
                ->toArray();

        $pending['episodes'] = array_values(
            array_diff($pending['episodes'], $processed_episodes)
        );

        return $pending;
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

    public function release() {
        if($this->media_type === 'movie') {
            return $this->hasOne('App\MovieYear');
        }

        if($this->media_type === 'show') {
            return $this->hasOne('App\ShowYear');
        }
    }

    public static function spotlight() {
        return
            self
                ::where('jumbotron', '!=', '')
                ->where('media_type', '=', 'movie')
                ->leftJoin('movie_year as my', 'my.media_id', '=', 'media.id')
                ->orderBy('my.year_released', 'desc')
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

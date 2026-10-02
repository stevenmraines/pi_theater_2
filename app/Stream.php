<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    protected $fillable = [
        'name',
        'menu_image',
        'month_start',
        'day_start',
        'month_end',
        'day_end',
        'type',
    ];

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('active', function (Builder $builder) {
            $now   = Carbon::now();
            $today = $now->month * 100 + $now->day;

            $start = '(month_start * 100 + day_start)';
            $end   = '(month_end * 100 + day_end)';

            $builder->where(function ($query) use ($today, $start, $end) {
                $query->whereNull('month_start')
                    // Normal range (e.g. Oct 1 - Oct 31) today must fall between start and end
                    ->orWhere(function ($query) use ($today, $start, $end) {
                        $query->whereRaw("$start <= $end")
                            ->whereRaw("$start <= ?", [$today])
                            ->whereRaw("$end >= ?", [$today]);
                    })
                    // Wrapping range (Dec 15 - Jan 5) today is after the start OR before the end
                    ->orWhere(function ($query) use ($today, $start, $end) {
                        $query->whereRaw("$start > $end")
                            ->where(function ($query) use ($today, $start, $end) {
                                $query->whereRaw("$start <= ?", [$today])
                                    ->orWhereRaw("$end >= ?", [$today]);
                            });
                    });
            });
        });
    }

    public function scopeWithMedia(\Illuminate\Database\Eloquent\Builder $query)
    {
        return $query->with([
            'media' => function ($q) {
                $q->where('stream_media.date', \Carbon\Carbon::today()->toDateString())
                    ->with(['media', 'media.drive', 'media.movie_year']);
            },
        ]);
    }
    
    public function getMedia()
    {
        switch ($this->id) {
            case 1:
                return $this->getNovelGraphix();
            case 2:
                return $this->getFrightVision();
            case 3:
                return $this->getHalloweenFavorites();
            default:
                return collect();
        }
    }
    
    public function getFrightVision()
    {
        return Media::where('media_type', 'movie')
            ->whereHas('genres', function ($query) {
                $query->whereIn('name', ['Horror']); 
            })
            ->with('genres')
            ->get();
    }
    
    public function getHalloweenFavorites()
    {
        return Media::where('media_type', 'movie')
            ->whereHas('collections', function ($query) {
                $query->whereIn('name', ['Halloween Favorites']);
            })
            ->with('collections')
            ->get();
    }
    
    public function getNovelGraphix()
    {
        return Media::where('media_type', 'movie')
            ->whereHas('genres', function ($query) {
                $query->whereIn('name', ['Superhero']); 
            })
            ->with('genres')
            ->get();
    }

    public function media()
    {
        return $this->hasMany(StreamMedia::class, 'stream_id', 'id');
    }
}

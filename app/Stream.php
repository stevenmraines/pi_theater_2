<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    protected $fillable = ['name', 'menu_image'];

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

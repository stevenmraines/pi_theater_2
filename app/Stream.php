<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    protected $fillable = ['name', 'menu_image'];
    
    public function getMedia()
    {
        switch ($this->id) {
            case 1:
                return $this->getNovelGraphix();
            case 2:
                return $this->getFrightVision();
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
    
    public function getNovelGraphix()
    {
        return Media::where('media_type', 'movie')
            ->whereHas('genres', function ($query) {
                $query->whereIn('name', ['Superhero']); 
            })
            ->with('genres')
            ->get();
    }
}

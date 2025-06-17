<?php

namespace App;

use App\Utilities\PendingFilesProvider;
use Illuminate\Database\Eloquent\Model;

class Drive extends Model
{
    public function media() {
        return $this->belongsToMany('App\Media')->withPivot('filename');
    }

    public function episodes() {
        return $this->belongsToMany('App\Episode')->withPivot('filename');
    }
    
    public function drive_media() {
        return $this->hasMany('App\DriveMedia');
    }
    
    public function drive_episode() {
        return $this->hasMany('App\DriveEpisode');
    }

    public static function pending() {
        // Get all current drives
        $drives = Drive::all();

        $pending = [];
        
        // Get pending files for each drive
        $drives->each(function($drive) use(&$pending) {
            $pending[$drive['id']] = [
                'movies' => PendingFilesProvider::getMoviesFromDrive($drive, $drive->drive_media),
                'episodes' => PendingFilesProvider::getEpisodesFromDrive($drive, $drive->drive_episode),
            ];
        });

        return $pending;
    }
    
    public function movie_directory(): ?string
    {
        return config("drives.{$this->name}.movies");
    }
    
    public function episode_directory(): ?string
    {
        return config("drives.{$this->name}.episodes");
    }
}

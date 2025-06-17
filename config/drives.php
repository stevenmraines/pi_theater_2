<?php

$localPrefix = env('APP_ENV', 'production') !== 'production' ? 'testing/' : '';

return [
    
    /*
    |--------------------------------------------------------------------------
    | Hard Drives
    |--------------------------------------------------------------------------
    |
    | This is where the web accessible paths are defined for any attached
    | hard drive(s) which contain the various video files.
    |
    */
    
    'hdd1' => [
        
        'root' => $localPrefix . 'videos/hdd1',
        
        'movies' => $localPrefix . 'videos/hdd1/movies',
        
        'episodes' => $localPrefix . 'videos/hdd1/shows',
        
    ],
    
];
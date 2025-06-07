<?php

namespace App\Utilities;

use App\Media;
use Illuminate\Http\Request;

class PosterImage {
    
    public static function getUniqueFilename(Request $request, Media $media, string $proposedFilename): string
    {
        
        $files = [];
        
        $path = 'img' . DIRECTORY_SEPARATOR . 'posters';
        
        $items = new \DirectoryIterator(
            public_path() . DIRECTORY_SEPARATOR . $path
        );
        
        foreach($items as $item) {
            // Skip directories
            if($item->isDot() || $item->isDir()) {
                continue;
            }
            
            if(! in_array($item->getFilename(), $files)) {
                $files[] = $item->getFilename();
            }
        }
        
        if (! in_array($proposedFilename, $files)) {
            return $proposedFilename;
        }
        
        $filename = pathinfo($proposedFilename, PATHINFO_FILENAME);
        $ext = pathinfo($proposedFilename, PATHINFO_EXTENSION);
        $year = $media->media_type === 'movie' ? $request->yearReleased : $request->yearStart;
        
        return $filename . '-' . $year . '.' . $ext;
        
    }
    
}

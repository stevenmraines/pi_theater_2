<?php

namespace App\Utilities;

use App\Media;
use Illuminate\Http\Request;

class Image
{
    
    public static function getPosterFilename(Request $request, Media $media)
    {
        $proposedFilename = self::getImageFilename($request);
        /*
         * Make sure poster filename is unique, in case two movies have the same name
         * (such as when uploading a remake of an existing movie).
         */
        return self::getUniqueFilename($request, $media, $proposedFilename);
    }

    public static function getJumbotronFilename(Request $request)
    {
        if($request->hasFile('jumbotron')) {
            return self::getImageFilename($request, 'jumbotron');
        }

        return null;
    }

    protected static function getImageFilename(Request $request, string $field = 'poster')
    {
        $patterns = ['/[^a-z\d\s]/', '/\s/'];
        $replacements = ['', '-'];
        $formattedTitle = preg_replace($patterns, $replacements, strtolower($request->title));
        // TODO Shouldn't this be $request->{$field}?
        $imageExtension = strtolower(pathinfo($request->poster, PATHINFO_EXTENSION));

        // Default to jpg
        if(empty($imageExtension)) {
            $imageExtension = 'jpg';
        }
        
        return $formattedTitle . '.' . $imageExtension;
    }
    
    protected static function getUniqueFilename(Request $request, Media $media, string $proposedFilename): string
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

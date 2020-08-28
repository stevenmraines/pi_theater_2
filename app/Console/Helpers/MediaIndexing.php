<?php

namespace App\Console\Helpers;

/**
 * Provides the core functionality for the custom Algolia indexing Artisan commands.
 */
class MediaIndexing
{
    /**
     * Takes a filename and a collection of either a single row of the media table,
     * or all rows of the media table, and then writes that data as JSON to the file.
     * 
     * @param string $file The file to write to.
     * @param object $media The Collection of media data.
     */
    public static function write_to_file($file, $media)
    {
        echo "Opening $file\n";

        $handle = fopen($file, 'w');
        
        if(!$handle) {
            die("Could not open file\n");
        }

        echo "Writing to file\n";

        fwrite($handle, $media->toJson());

        echo "Closing file\n";

        fclose($handle);
    }
}
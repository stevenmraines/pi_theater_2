<?php

namespace App\Utilities;

class Video
{

    /**
     * Takes a video file and returns an array of information like duration and dimensions.
     *
     * @param string $fullPath The directory and filename of the video file.
     * @return array The video file attributes.
     */
    private static function _getAttributes($fullPath)
    {
        $ffmpeg = 'ffmpeg';  // The path to ffmpeg on the server
        $command = $ffmpeg . ' -i ' . $fullPath . ' -vstats 2>&1';
        $output = shell_exec($command);

        $sizesRegex = "/Video: ([^,]*), ([^,]*), ([0-9]{1,4})x([0-9]{1,4})/";

        // In case first one doesn't match
        if(!preg_match($sizesRegex, $output, $regs)) {
            $sizesRegex = "/Video: ([^\r\n]*), ([^,]*), ([0-9]{1,4})x([0-9]{1,4})/";
        }

        if(preg_match($sizesRegex, $output, $regs)) {
            $codec = $regs[1] ? $regs[1] : null;
            $width = $regs[3] ? $regs[3] : null;
            $height = $regs[4] ? $regs[4] : null;
        }

        $durationRegex = "/Duration: ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}).([0-9]{1,2})/";

        if(preg_match($durationRegex, $output, $regs)) {
            $hours = $regs[1] ? $regs[1] : null;
            $mins = $regs[2] ? $regs[2] : null;
            $secs = $regs[3] ? $regs[3] : null;
            $ms = $regs[4] ? $regs[4] : null;
            $duration = !is_null($hours) && !is_null($mins) && !is_null($secs) ?
                ( $secs + ( $mins * 60 ) + ( $hours * 3600 ) ) : null;
        }

        return [
            'codec' => $codec,
            'duration' => $duration,
            'height' => $height,
            'hours' => $hours,
            'mins' => $mins,
            'ms' => $ms,
            'secs' => $secs,
            'width' => $width
        ];
    }

    /**
     * This method acts as a wrapper for the private method _getAttributes.
     * The code for that method was found online and is pretty buggy,
     * so I'm just wrapping it in a try / catch and returning an empty array if there's an exception.
     *
     * @param string $fullPath The directory and filename of the video file.
     * @return array The video file attributes.
     */
    public static function getAttributes($fullPath)
    {
        try {
            $attributes = self::_getAttributes($fullPath);
        }catch(\Exception $e) {
            $attributes = [];
        }

        return $attributes;
    }

}
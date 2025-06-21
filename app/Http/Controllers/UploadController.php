<?php

namespace App\Http\Controllers;

use App\Drive;
use App\Episode;
use App\Media;
use App\Utilities\ImageFilenameProvider;
use App\Events\EpisodeUploaded;
use App\Events\MovieUploaded;
use App\Events\ShowUploaded;
use Illuminate\Http\Request;

set_time_limit(0);

class UploadController extends Controller
{
    public function episode(Request $request)
    {
        $request->validate([
            // TODO Run SQL to convert empty strings to NULL on episodes table summary field and update code to match
            'drive_id' => 'required|exists:drives,id',
            'episodeNumber' => 'required|integer|min:1',
            'file' => 'required|string',
            'season' => 'required|integer|min:1',
            'media_id' => 'required|exists:media,id',
            'summary' => 'nullable|string|max:4000',
            'title' => 'required|string|max:191',
        ]);

        $episode = new Episode([
            'media_id' => $request->media_id,
            'season' => $request->season,
            'episode_number' => $request->episodeNumber,
            'title' => $request->title,
            'summary' => $request->summary,
        ]);

        $episode->save();
        
        event(new EpisodeUploaded(Drive::find($request->drive_id), $episode, $request));
        
        // TODO Not sure this even works, also there may be a better way to get minidlna to recognize new files
        if(env('APP_ENV', 'production') === 'production') {
            exec("sudo service minidlna restart");
        }

        return [
            'success' => true
        ];
    }

    public function movie(Request $request)
    {
        $request->validate([
            'collections' => 'array',
            'genres' => 'required|array',
            'jumbotron' => 'nullable|mimetypes:image/jpeg,image/png,image/bmp,image/gif,image/svg+xml,image/webp',
            'notes' => 'nullable|string|max:191',
            'poster' => 'required_without:posterUrl|mimetypes:image/jpeg,image/png,image/bmp,image/gif,image/svg+xml,image/webp',
            'posterUrl' => 'required_without:poster|url',
            'summary' => 'required|string|max:4000',
            'title' => 'required|string|max:191',
            'drive_id' => 'required|exists:drives,id',
            'file' => 'required|string',
            'yearReleased' => 'required|date_format:Y|after_or_equal:1900|before_or_equal:' . date('Y'),
        ]);
        
        $media = new Media;
        $media->media_type = 'movie';
        $media->title = $request->title;
        $media->summary = $request->summary;
        $media->notes = $request->notes;
        $media->jumbotron = ImageFilenameProvider::getJumbotronFilename($request);
        $media->poster = ImageFilenameProvider::getPosterFilename($request, $media);
        $media->save();
        
        event(new MovieUploaded(Drive::find($request->drive_id), $media, $request));
        
        // TODO Not sure this even works, also there may be a better way to get minidlna to recognize new files
        if(env('APP_ENV', 'production') === 'production') {
            exec("sudo service minidlna restart");
        }

        return [
            'success' => true
        ];
    }

    public function show(Request $request)
    {
        $request->validate([
            'collections' => 'array',
            'genres' => 'required|array',
            'jumbotron' => 'nullable|mimetypes:image/jpeg,image/png,image/bmp,image/gif,image/svg+xml,image/webp',
            'notes' => 'nullable|string|max:191',
            'poster' => 'required_without:posterUrl|mimetypes:image/jpeg,image/png,image/bmp,image/gif,image/svg+xml,image/webp',
            'posterUrl' => 'required_without:poster|url',
            'summary' => 'required|string|max:4000',
            'title' => 'required|string|max:191',
            // TODO figure out how to extend existing after_or_equal date rule to allow zero
            'yearEnd' => 'required|date_format:Y|gtef:yearStart|before_or_equal:' . date('Y'),
            'yearStart' => 'required|date_format:Y|after_or_equal:1900|before_or_equal:' . date('Y'),
        ]);

        $media = new Media;
        $media->media_type = 'show';
        $media->title = $request->title;
        $media->summary = $request->summary;
        $media->notes = $request->notes;
        $media->jumbotron = ImageFilenameProvider::getJumbotronFilename($request);
        $media->poster = ImageFilenameProvider::getPosterFilename($request, $media);
        $media->save();
        
        event(new ShowUploaded($media, $request));

        return [
            'success' => true
        ];
    }
}

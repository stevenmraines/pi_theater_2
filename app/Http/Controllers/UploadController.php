<?php

namespace App\Http\Controllers;

use App\Collection;
use App\Drive;
use App\Episode;
use App\Genre;
use App\Media;
use App\Utilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

set_time_limit(0);

// TODO break up some of this functionality into smaller controllers
class UploadController extends Controller
{
    public function episode(Request $request)
    {
        $this->validateEpisode($request);

        $episodeId = $this->insertIntoEpisodes($request);

        $this->insertIntoDriveEpisode($request, $episodeId);

        return [
            'success' => true
        ];
    }

    public function movie(Request $request)
    {
        $this->validateMovie($request);

        $mediaId = $this->insertIntoMedia($request);

        $this->insertIntoDriveMedia($request, $mediaId);

        $this->insertIntoMovieYear($request, $mediaId);

        $this->insertIntoGenreMedia($request, $mediaId);

        $this->insertIntoCollectionMedia($request, $mediaId);

        if(empty($request->posterUrl)) {
            $this->moveImages($request);
        }

        return [
            'success' => true
        ];
    }

    public function show(Request $request)
    {
        $this->validateShow($request);

        $mediaId = $this->insertIntoMedia($request, 'show');

        $this->insertIntoShowYear($request, $mediaId);

        $this->insertIntoGenreMedia($request, $mediaId);

        $this->insertIntoCollectionMedia($request, $mediaId);

        $this->moveImages($request);

        return [
            'success' => true
        ];
    }

    protected function validateEpisode(Request $request)
    {
        return $request->validate($this->getEpisodeValidationRules());
    }

    protected function validateMovie(Request $request)
    {
        return $request->validate($this->getMovieValidationRules());
    }

    protected function validateShow(Request $request)
    {
        return $request->validate($this->getShowValidationRules());
    }

    protected function getEpisodeValidationRules()
    {
        // TODO Run SQL to convert empty strings to NULL on episodes table summary field and update code to match
        return [
            'drive_id' => 'required|exists:drives,id',
            'episodeNumber' => 'required|integer|min:1',
            'file' => 'required|string',
            'season' => 'required|integer|min:1',
            'media_id' => 'required|exists:media,id',
            'summary' => 'nullable|string|max:4000',
            'title' => 'required|string|max:191',
        ];
    }

    protected function getMediaValidationRules()
    {
        return [
            'collections' => 'array',
            'genres' => 'required|array',
            'jumbotron' => 'nullable|image',
            'notes' => 'nullable|string|max:191',
            // TODO can leave this here once IMDb API is supported on both movies and shows
            // 'poster' => 'required_without:posterUrl|image',
            // 'posterUrl' => 'required_without:poster|url',
            'summary' => 'required|string|max:4000',
            'title' => 'required|string|max:191',
        ];
    }

    protected function getMovieValidationRules()
    {
        $movieValidationRules = [
            'drive_id' => 'required|exists:drives,id',
            'file' => 'required|string',
            'poster' => 'required_without:posterUrl|image',
            'posterUrl' => 'required_without:poster|url',
            'yearReleased' => 'required|date_format:Y|after_or_equal:1900|before_or_equal:' . date('Y'),
        ];

        return array_merge(
            $this->getMediaValidationRules(),
            $movieValidationRules
        );
    }

    protected function getShowValidationRules()
    {
        // TODO figure out how to extend existing after_or_equal date rule to allow zero
        $showValidationRules = [
            'poster' => 'required|image',
            'yearEnd' => 'required|date_format:Y|gtef:yearStart|before_or_equal:' . date('Y'),
            'yearStart' => 'required|date_format:Y|after_or_equal:1900|before_or_equal:' . date('Y'),
        ];

        return array_merge(
            $this->getMediaValidationRules(),
            $showValidationRules
        );
    }

    protected function insertIntoEpisodes(Request $request)
    {
        $episode = new Episode;

        $episode->media_id = $request->media_id;
        $episode->season = $request->season;
        $episode->episode_number = $request->episodeNumber;
        $episode->title = $request->title;
        $episode->summary = $request->summary;

        $episode->save();

        return $episode->id;
    }

    protected function insertIntoDriveEpisode(Request $request, int $episodeId)
    {
        $drive = Drive::find($request->drive_id)->name;

        list($width, $height, $duration) = $this->getAttributeDefaults(
            Utilities\Video::getAttributes(
                // TODO use some Laravel helper function to get path
                "/var/www/pi_theater_2/public/videos/$drive/shows/" . $request->file
            )
        );

        $insert = "
            INSERT INTO drive_episode
            (
                drive_id,
                episode_id,
                filename,
                width,
                height,
                duration
            )
            VALUES (?, ?, ?, ?, ?, ?)
        ";

        $values = [
            $request->drive_id,
            $episodeId,
            $request->file,
            $width,
            $height,
            $duration
        ];

        return DB::insert($insert, $values);
    }

    protected function insertIntoMedia(Request $request, string $mediaType = 'movie')
    {
        $media = new Media;

        $filename = $this->getPosterFilename($request);

        $media->media_type = $mediaType;
        $media->title = $request->title;
        $media->summary = $request->summary;
        $media->notes = $request->notes;
        $media->poster = $filename;
        $media->jumbotron = $this->getJumbotronFilename($request);

        // Handle movie posterUrl
        if($mediaType == 'movie' && !empty($request->posterUrl)) {
            $filepath = public_path('img') . DIRECTORY_SEPARATOR . 'posters'
                . DIRECTORY_SEPARATOR . $filename;
            file_put_contents($filepath, file_get_contents($request->posterUrl));
            $this->setPermissions($filepath);
            exec("convert $filepath -resize 230x345\! $filepath");
        }

        $media->save();

        return $media->id;
    }

    protected function getPosterFilename(Request $request)
    {
        return $this->getImageFilename($request);
    }

    protected function getJumbotronFilename(Request $request)
    {
        if($request->hasFile('jumbotron')) {
            return $this->getImageFilename($request, 'jumbotron');
        }

        return null;
    }

    protected function getImageFilename(Request $request, string $field = 'poster')
    {
        $formattedTitle = $this->getFormattedTitle($request->title);
        $imageExtension = strtolower(pathinfo($request->poster, PATHINFO_EXTENSION));

        // TODO figure out how to do this without screwing up Algolia indexing
        // $imageExtension = $request->{$field}->extension();

        // Default to jpg
        if(empty($imageExtension)) {
            $imageExtension = 'jpg';
        }

        return $formattedTitle . '.' . $imageExtension;
    }

    protected function getFormattedTitle(string $title)
    {
        $patterns = ['/[^a-z\d\s]/', '/\s/'];
        $replacements = ['', '-'];

        return preg_replace($patterns, $replacements, strtolower($title));
    }

    protected function insertIntoDriveMedia(Request $request, int $mediaId)
    {
        $drive = Drive::find($request->drive_id)->name;

        list($width, $height, $duration) = $this->getAttributeDefaults(
            Utilities\Video::getAttributes(
                // TODO use some Laravel helper function to get path
                "/var/www/pi_theater_2/public/videos/$drive/movies/" . $request->file
            )
        );

        $insert = "
            INSERT INTO drive_media
            (
                media_id,
                drive_id,
                filename,
                width,
                height,
                duration
            )
            VALUES (?, ?, ?, ?, ?, ?)
        ";

        $values = [
            $mediaId,
            $request->drive_id,
            $request->file,
            $width,
            $height,
            $duration
        ];

        return DB::insert($insert, $values);
    }

    protected function insertIntoMovieYear(Request $request, int $mediaId)
    {
        $insert = "
            INSERT INTO movie_year
            (
                media_id,
                year_released
            )
            VALUES (?, ?)
        ";

        $values = [
            $mediaId,
            $request->yearReleased
        ];

        return DB::insert($insert, $values);
    }

    protected function insertIntoShowYear(Request $request, int $mediaId)
    {
        $insert = "
            INSERT INTO show_year
            (
                media_id,
                year_start,
                year_end
            )
            VALUES (?, ?, ?)
        ";

        $values = [
            $mediaId,
            $request->yearStart,
            $request->yearEnd
        ];

        return DB::insert($insert, $values);
    }

    protected function insertIntoGenreMedia(Request $request, int $mediaId)
    {
        $genreIds = $this->getGenreIds($request);

        foreach($genreIds as $genreId) {
            $insert = "
                INSERT INTO genre_media
                (
                    genre_id,
                    media_id
                )
                VALUES (?, ?)
            ";

            $values = [
                $genreId,
                $mediaId
            ];

            DB::insert($insert, $values);
        }
    }

    protected function getGenreIds(Request $request)
    {
        return $this->getGenreOrCollectionIds($request, 'genres', Genre::class);
    }

    protected function insertIntoCollectionMedia(Request $request, int $mediaId)
    {
        if(
            count($request->collections) === 1
            && ($request->collections[0] === '' || is_null($request->collections[0]))
        ) {
            return;
        }

        $collectionIds = $this->getCollectionIds($request);

        if(count($collectionIds) > 0) {
            foreach($collectionIds as $collectionId) {
                $insert = "
                    INSERT INTO collection_media
                    (
                        collection_id,
                        media_id
                    )
                    VALUES (?, ?)
                ";

                $values = [
                    $collectionId,
                    $mediaId
                ];

                DB::insert($insert, $values);
            }
        }
    }

    protected function getCollectionIds(Request $request)
    {
        return $this->getGenreOrCollectionIds($request, 'collections', Collection::class);
    }

    protected function getGenreOrCollectionIds(Request $request, string $field, $model)
    {
        $ids = [];

        foreach($request->{$field} as $name) {
            $record =
                $model
                    ::where('name', '=', $name)
                    ->get()
                    ->first();

            if(!is_null($record)) {
                $id = $record->id;
            }

            if(is_null($record)) {
                $id = $this->insertGenreOrCollection($model, $name);
            }

            $ids[] = $id;
        }

        return array_unique($ids);
    }

    protected function insertGenreOrCollection($model, string $name)
    {
        $instance = new $model;

        $instance->name = $name;

        $instance->save();

        return $instance->id;
    }

    protected function moveImages(Request $request)
    {
        $posterFilename = $this->getPosterFilename($request);

        $request->poster->storeAs('posters', $posterFilename, 'images');

        $this->setPermissions(
            public_path('img') . DIRECTORY_SEPARATOR . 'posters'
            . DIRECTORY_SEPARATOR . $posterFilename
        );

        if($request->hasFile('jumbotron')) {
            $jumbotronFilename = $this->getJumbotronFilename($request);

            $request->jumbotron->storeAs('jumbotron', $jumbotronFilename, 'images');

            $this->setPermissions(
                public_path('img') . DIRECTORY_SEPARATOR . 'jumbotron'
                . DIRECTORY_SEPARATOR . $jumbotronFilename
            );
        }
    }

    protected function setPermissions(string $path)
    {
        chmod($path, 0664);
        // TODO figure out what to do about chown not being permitted
//        chown($path, 'pi');
        chgrp($path, 'www-data');
    }

    protected function getAttributeDefaults($attributes)
    {
        return [
            isset($attributes['width']) && !is_null($attributes['width']) ? $attributes['width'] : 0,
            isset($attributes['height']) && !is_null($attributes['height']) ? $attributes['height'] : 0,
            isset($attributes['duration']) && !is_null($attributes['duration']) ? $attributes['duration'] : 0
        ];
    }
}

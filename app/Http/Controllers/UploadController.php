<?php

namespace App\Http\Controllers;

use App\Collection;
use App\Episode;
use App\Genre;
use App\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

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

        $this->moveImages($request);

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
            'poster' => 'required|image',
            'summary' => 'required|string|max:4000',
            'title' => 'required|string|max:191',
        ];
    }

    protected function getMovieValidationRules()
    {
        $movieValidationRules = [
            'drive_id' => 'required|exists:drives,id',
            'file' => 'required|string',
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
        $insert = "
            INSERT INTO drive_episode
            (
                drive_id,
                episode_id,
                filename
            )
            VALUES (?, ?, ?)
        ";

        $values = [
            $request->drive_id,
            $episodeId,
            $request->file
        ];

        return DB::insert($insert, $values);
    }

    protected function insertIntoMedia(Request $request, string $mediaType = 'movie')
    {
        $media = new Media;

        $media->media_type = $mediaType;
        $media->title = $request->title;
        $media->summary = $request->summary;
        $media->notes = $request->notes;
        $media->poster = $this->getPosterFilename($request);
        $media->jumbotron = $this->getJumbotronFilename($request);

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
        $imageExtension = $request->{$field}->extension();

        // Default to jpg
        if (is_null($imageExtension)) {
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
        $insert = "
            INSERT INTO drive_media
            (
                media_id,
                drive_id,
                filename
            )
            VALUES (?, ?, ?)
        ";

        $values = [
            $mediaId,
            $request->drive_id,
            $request->file
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

        if($request->hasFile('jumbotron')) {
            $jumbotronFilename = $this->getJumbotronFilename($request);

            $request->jumbotron->storeAs('jumbotron', $jumbotronFilename, 'images');
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

class UploadController extends Controller
{
    public function episode(Request $request)
    {
        $this->validateEpisode($request);

        return [
            'success' => true
        ];
    }

    public function movie(Request $request)
    {
        $this->validateMovie($request);

        return [
            'success' => true
        ];
    }

    public function show(Request $request)
    {
        $this->validateShow($request);

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
            'episodeNumber' => 'required|integer|min:1',
            'file' => 'required|string',
            'season' => 'required|integer|min:1',
            'media_id' => 'required|integer|min:1',
            'summary' => 'nullable|string|max:4000',
            'title' => 'required|string|max:191',
        ];
    }

    protected function getMediaValidationRules()
    {
        return [
            'collections' => 'array',
            'genres' => 'required|array',
            'jumbotron' => 'nullable|file',
            'notes' => 'nullable|string|max:191',
            'poster' => 'required|file',
            'summary' => 'nullable|required|string|max:4000',
            'title' => 'required|string|max:191',
        ];
    }

    protected function getMovieValidationRules()
    {
        $movieValidationRules = [
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
        $showValidationRules = [
            'yearEnd' => 'required|date_format:Y|gtef:yearStart|after_or_equal:1900|before_or_equal:' . date('Y'),
            'yearStart' => 'required|date_format:Y|after_or_equal:1900|before_or_equal:' . date('Y'),
        ];

        return array_merge(
            $this->getMediaValidationRules(),
            $showValidationRules
        );
    }
}

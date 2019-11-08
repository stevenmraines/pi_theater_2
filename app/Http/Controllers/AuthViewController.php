<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/*
 * This controller will return views only accessible
 * by registered users with admin access
 */
class AuthViewController extends Controller
{
    public function __construct() {
        $this->middleware('admin');
    }

    public function upload() {
        $initialState = [
            'collections' => \App\Collection::all(),
            'drives' => \App\Drive::all(),
            'genres' => \App\Genre::all(),
            'pending' => \App\Drive::pending(),
            'shows' => \App\Media::where('media_type', '=', 'show')->with('episodes')->get()
        ];

        return view('admin.upload.upload')->with('initialState', json_encode($initialState));
    }
}

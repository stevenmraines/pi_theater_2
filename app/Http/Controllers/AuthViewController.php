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
            'pending' => \App\Media::pending(),
            'genres' => \App\Genre::all(),
            'collections' => \App\Collection::all()
        ];

        return view('admin.upload')->with('initialState', json_encode($initialState));
    }
}

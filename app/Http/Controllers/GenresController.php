<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;
use App\Genre;

class GenresController extends Controller
{
    public function movies($id) {
		return Genre::find($id)->load('movies');
	}

	public function shows($id) {
		return Genre::find($id)->load('shows');
	}

    public function allMedia($id) {
        return Genre::find($id)->load('movies')->load('shows');
    }
}

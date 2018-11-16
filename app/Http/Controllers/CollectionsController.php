<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Collection;

class CollectionsController extends Controller
{
    public function recent($limit) {
        return Collection::limit($limit)->get();
    }

    public function movies($id) {
        return Collection::find($id)->load('movies');
    }

    public function shows($id) {
        return Collection::find($id)->load('shows');
    }

    public function episodes($id) {
        return Collection::find($id)->load('episodes');
    }

    public function allMedia($id) {
        return Collection::find($id)
                ->load('movies')
                ->load('shows')
                ->load('episodes');
    }
}

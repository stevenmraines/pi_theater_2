<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Collection;

class CollectionsController extends Controller
{
  public function allMedia($id) {
    return Collection::find($id)
      ->load('movies')
      ->load('shows')
      ->load('episodes');
  }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Show;

class ShowsController extends Controller
{
    public function info($id) {
		return Show::find($id);
	}

	public function recent($limit, $offset) {
		return Show::orderBy('created_at', 'desc')->limit($limit)->offset($offset)->get();
	}

	public function year($year) {
		return Show::where('year', $year)->get();
	}

	public function genres($id) {
		return Show::find($id)->load('genres');
	}
}

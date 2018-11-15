<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/*
 * This controller will return views only accessible
 * by registered users
 */
class AuthViewController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }

    public function upload() {
        return view('admin.upload');
    }
}

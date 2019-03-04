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
        return view('admin.upload');
    }
}

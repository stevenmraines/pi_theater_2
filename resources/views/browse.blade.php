<?php
use Illuminate\Support\Facades\Auth;
$user = Auth::check();
?>

@extends('master')
@section('browse')
	<link rel="stylesheet" href="{{ asset('css/browse.css') }}" />
	@include('header')
	@include('new_collections')
	@include('poster_rows')
	<movie-modal></movie-modal>
	<registration-modal></registration-modal>
	<login-modal></login-modal>
	<script>
		var genres			= <?= $genres ?>;
		var collections		= <?= $collections ?>;
		var recent_movies	= <?= $recent_movies ?>;
	</script>
	<script src='{{ asset('js/browse.js') }}'></script>
@endsection

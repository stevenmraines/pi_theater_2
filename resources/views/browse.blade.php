<?php
$user = auth()->check();
?>

@extends('layouts.master')
@section('content')
	<link rel="stylesheet" href="{{ asset('css/browse.css') }}" />
	<div id="vue-wrapper" class='container-fluid px-0'>
		@include('header')
		@include('new_collections')
		@include('categories')
		@include('poster_rows')
		<movie-modal></movie-modal>
		<show-modal></show-modal>
		<registration-modal></registration-modal>
		<login-modal></login-modal>
	</div>
	<script src='{{ asset('js/browse.js') }}'></script>
@endsection

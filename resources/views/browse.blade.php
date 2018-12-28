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
		<search-modal v-bind:search-results="[]"></search-modal>
		<movie-modal></movie-modal>
		<show-modal></show-modal>
		<login-modal></login-modal>
		<registration-modal></registration-modal>
	</div>
	<script src='{{ asset('js/browse.js') }}'></script>
@endsection

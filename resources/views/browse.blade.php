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
		<search-modal v-bind:contents="[]"></search-modal>
		<collection-modal
			v-bind:contents="collectionResultsPrepared"
			v-bind:logo="collectionResults.logo"
		></collection-modal>
		<watchlist-modal v-bind:contents="watchlistPrepared"></watchlist-modal>
		<movie-modal></movie-modal>
		<show-modal></show-modal>
		<login-modal></login-modal>
		<registration-modal></registration-modal>
	</div>
	<script src='{{ asset('js/browse.js') }}'></script>
@endsection

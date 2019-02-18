<?php
	$user = auth()->check();
?>

@extends('layouts.master')
@section('content')
	<link rel="stylesheet" href="{{ asset('css/browse.css') }}" />
	<div id="vue-wrapper" class='container-fluid px-0'>
		<input v-model="query" placeholder="Search Movies and TV Shows...">
		<ais-index
		  app-id="{{ config('scout.algolia.id') }}"
		  api-key="{{ env('ALGOLIA_SEARCH') }}"
		  index-name="movies"
		  :query="query"
		>
			<!-- Other Algolia search components go here -->
			{{-- <ais-input placeholder="Search movies..."></ais-input> --}}

  			<ais-results></ais-results>
		</ais-index>
		<ais-index
		  app-id="{{ config('scout.algolia.id') }}"
		  api-key="{{ env('ALGOLIA_SEARCH') }}"
		  index-name="shows"
		  :query="query"
		>
			<!-- Other Algolia search components go here -->
			{{-- <ais-input placeholder="Search movies..."></ais-input> --}}

  			<ais-results></ais-results>
		</ais-index>

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

@extends('master')
@section('content')
<div id="vue-wrapper" class="container-fluid px-0">
	@include('navbar')
	@include('recentCollections')
	@include('categories')

	<movie-modal
		v-bind:id="movieModal.id"
		v-bind:title="movieModal.title"
		v-bind:summary="movieModal.summary"
		v-bind:notes="movieModal.notes"
		v-bind:year_start="movieModal.year_start"
		v-bind:poster="movieModal.poster"
		v-bind:genres="movieModal.genres"
		v-bind:user="user"
	></movie-modal>

	<show-modal
		v-bind:id="showModal.id"
		v-bind:title="showModal.title"
		v-bind:summary="showModal.summary"
		v-bind:notes="showModal.notes"
		v-bind:year_start="showModal.year_start"
		v-bind:year_end="showModal.year_end"
		v-bind:poster="showModal.poster"
		v-bind:episodes="showModal.episodes"
		v-bind:genres="showModal.genres"
		v-bind:seasons="showModal.seasons"
		v-bind:user="user"
	></show-modal>

	<collection-modal v-bind:collection="collection"></collection-modal>

	<genre-modal v-bind:genre="genre"></genre-modal>

	<search-modal></search-modal>

	<watchlist-modal v-bind:user="user"></watchlist-modal>

	<poster-row
		v-bind:title="'Recent Movies'"
		v-bind:index="'recentMedia'"
		v-bind:query-params="{ filters : 'media_type:movie' }"
	></poster-row>

	<poster-row
		v-bind:title="'Recent Shows'"
		v-bind:index="'recentMedia'"
		v-bind:query-params="{ filters : 'media_type:show' }"
	></poster-row>
</div>

<script>
    window.__INITIAL_STATE__ = <?= $initialState ?>;
</script>
<script src='{{ asset('js/app.js') }}'></script>
<script src='{{ asset('js/browse.js') }}'></script>
@endsection

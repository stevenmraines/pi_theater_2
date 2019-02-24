<?php
	$user = auth()->check();
?>

<div id="vue-wrapper" class='container-fluid px-0'>
	@include('navbar')
	{{-- @include('newCollections')
	@include('categories')
	@include('posterRows')
	<search-modal v-bind:contents="[]"></search-modal>
	<collection-modal
		v-bind:contents="collectionResultsPrepared"
		v-bind:logo="collectionResults.logo"
	></collection-modal>
	<watchlist-modal v-bind:contents="watchlistPrepared"></watchlist-modal>
	<movie-modal></movie-modal>
	<show-modal></show-modal>
	<login-modal></login-modal>
	<registration-modal></registration-modal> --}}
</div>
<script>
    window.__INITIAL_STATE__ = <?= $initialState ?>;
</script>
<script src='{{ asset('js/app.js') }}'></script>
<script src='{{ asset('js/browse.js') }}'></script>

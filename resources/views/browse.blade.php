<?php
	$user = auth()->check();
?>

<div id="vue-wrapper" class="container-fluid px-0">
	@include('navbar')

	{{-- <ais-index
		app-id="JUG06PFXKY"
		api-key="713be18b5c43b5766349f0a144622559"
		index-name="media"
	>
		<div>
			<ais-search-box placeholder="Find movies..."></ais-search-box>
			<ais-results>
				<template slot-scope="{ result }">
				<poster-container
					v-bind:key="result.objectID"
					v-bind:id="result.id"
					v-bind:title="result.title"
					v-bind:poster="result.poster"
				></poster-container>
			</template>
			</ais-results>
		</div>
	</ais-index> --}}

	<movie-modal
		v-bind:id="movieModal.id"
		v-bind:title="movieModal.title"
		v-bind:summary="movieModal.summary"
		v-bind:notes="movieModal.notes"
		v-bind:year_start="movieModal.year_start"
		v-bind:poster="movieModal.poster"
		v-bind:genres="movieModal.genres"
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
	></show-modal>

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

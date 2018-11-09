@extends('layouts.master')
@section('content')
	<div id="movie-container">
		<!--<div class="video-loader"></div>-->
		<video id="video-player" controls autoplay>
			<source src="@{{ movie.video }}" type="mp4">
		</video>
	</div>
	<div id="time-range-container">
		<input type="range" id="time-range" min="0" />
	</div>
	<script type="text/javascript">
		var movie = <?= json_encode($movie->toArray()) ?>;
		new Vue({
			el: '#movie-container',
			data: {
				movie: movie
			}
		});

		new Vue({
			el: '#title',
			data: {
				title: movie.title
			}
		});
	</script>
@endsection
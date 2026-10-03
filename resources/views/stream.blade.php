@extends('head')
@section('content')

<div id="vue-wrapper" class="container-fluid px-0">
	@include('navbar')
    
    <!-- TODO How to handle show vs movie? -->
    <stream-player
        v-if="Object.keys(currentMedia).length || Object.keys(currentEpisode).length"
        :environment="environment"
        :episode="currentEpisode"
        :media="currentMedia"
        :offset="offset"
        :paths="paths"
        :stream="currentStream"
        @ended="onCurrentEpisodeOrMediaEnded"
    ></stream-player>
    
    <timeline
        :current-media="currentMedia"
        :current-episode="currentEpisode"
        :paths="paths"
        :stream-id="streamId"
        :streams="streams"
    ></timeline>
</div>

<script>
    window.__INITIAL_STATE__ = <?= $initialState ?>;
</script>
<script src='{{ asset('js/app.js') }}'></script>
<script src='{{ asset('js/stream.js') }}'></script>

@endsection

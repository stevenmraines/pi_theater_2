@extends('head')
@section('content')

<div id="vue-wrapper" class="container-fluid px-0">
	@include('navbar')
    
    <stream-player
        v-if="Object.keys(currentMedia).length"
        :environment="environment"
        :media="currentMedia"
        :offset="offset"
        :paths="paths"
        :stream="currentStream"
        @StreamPlayer:ended="onCurrentMediaEnded"
    ></stream-player>
    
    <timeline
        :current-media="currentMedia"
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

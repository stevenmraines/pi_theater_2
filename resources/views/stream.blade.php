@extends('head')
@section('content')

<div id="vue-wrapper" class="container-fluid px-0">
	@include('navbar')
    <h3>{{ json_decode($initialState)->streamName }}</h3>
    <div>
        <video :src="'/testing/videos/hdd1/movies/' + streams[0].media[0].media.drive[0].pivot.filename"></video>
    </div>
    <timeline :streams="streams" :stream-id="streamId"></timeline>
</div>

<script>
    window.__INITIAL_STATE__ = <?= $initialState ?>;
</script>
<script src='{{ asset('js/app.js') }}'></script>
<script src='{{ asset('js/stream.js') }}'></script>

@endsection

@extends('head')
@section('content')

<div id="vue-wrapper" class="container-fluid px-0">
	@include('navbar')
    <div>
        <video :src="'/testing/videos/hdd1/movies/' + streams[0].media[0].media.drive[0].pivot.filename"></video>
    </div>
    <div>
        <div v-for="stream in streams">
            <h3>@{{ stream.name }}</h3>
            <div v-for="stream_media in stream.media">
                @{{ stream_media.media.title }}
            </div>
        </div>
    </div>
</div>

<script>
    window.__INITIAL_STATE__ = <?= $initialState ?>;
</script>
<script src='{{ asset('js/app.js') }}'></script>
<script src='{{ asset('js/stream.js') }}'></script>

@endsection


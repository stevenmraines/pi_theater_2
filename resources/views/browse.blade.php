@extends('master')

@section('content')

<div id="vue-wrapper" class="container-fluid px-0">
	@include('modals')
	@include('navbar')
	@include('recentCollections')
	@include('categories')
	@include('posterRows')
</div>

<script>
    window.__INITIAL_STATE__ = <?= $initialState ?>;
</script>
<script src='{{ asset('js/app.js') }}'></script>
<script src='{{ asset('js/browse.js') }}'></script>

@endsection

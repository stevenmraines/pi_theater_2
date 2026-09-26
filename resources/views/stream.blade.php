@extends('head')
@section('content')

<div id="vue-wrapper" class="container-fluid px-0">
	@include('navbar')
</div>

<script>
    window.__INITIAL_STATE__ = <?= $initialState ?>;
</script>
<script src='{{ asset('js/app.js') }}'></script>

@endsection


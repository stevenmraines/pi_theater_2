@extends('admin.upload.head')
@section('content')

    @if(!auth()->check())

		<?php redirect('/login'); ?>

    @elseif(!auth()->user()->admin)

		<?php abort(403, 'You do not have admin access') ?>

	@else

        <div id="app" class="container mt-3">
			<drive-form
				:initial-state.camel="initialState"
			></drive-form>
    	</div>

        <script>
            window.__INITIAL_STATE__ = <?= $initialState ?>;
        </script>
        <script src='{{ asset('js/app.js') }}'></script>
        <script src="{{ asset('js/upload.js') }}"></script>

    @endif

@endsection

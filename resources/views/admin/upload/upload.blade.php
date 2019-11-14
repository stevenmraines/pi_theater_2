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

            // Register this function globally so movie, episode, and show forms can all use it
            window.getFormData = function(data) {
                var formData = new FormData();

                for(var prop in data) {
                    if(data.hasOwnProperty(prop)) {
                        // If the value is an array, we need to treat it as such
                        if(Array.isArray(data[prop])) {
                            for(var i = 0; i < data[prop].length; i++) {
                                formData.append(prop + '[]', data[prop][i]);
                            }

                            continue;
                        }

                        formData.append(prop, data[prop]);
                    }
                }

                return formData;
            };
        </script>
        <script src='{{ asset('js/app.js') }}'></script>
        <script src="{{ asset('js/upload.js') }}"></script>

    @endif

@endsection

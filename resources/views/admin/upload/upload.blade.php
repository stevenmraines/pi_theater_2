@extends('admin.upload.head')
@section('content')

    @if(!auth()->check())

		<?php redirect('/login'); ?>

    @elseif(!auth()->user()->admin)

		<?php abort(403, 'You do not have admin access') ?>

	@else
        
        <div id="app" class="container mt-3">
            <a href="{{ route('browse') }}" target="_blank">
                <img src="{{ asset('/img/brand.png') }}" />
            </a>
			<drive-form></drive-form>
    	</div>

        <script>
            // Register some vars and functions globally so movie, episode, and show forms can all use them
            window.__INITIAL_STATE__ = <?= $initialState ?>;

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

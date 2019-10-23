@extends('admin.master')
@section('content')

    @if(!auth()->check())

        <?php die('You must be logged in to view this page'); ?>

    @else

        <div id="app" class="container mt-3">
    		<div class="row">
    			<div class="col">
    				<form class="form-inline" novalidate>
    					<div class="form-group">
    						<label for="drive">Hard drive</label>
    						<select id="drive" class="form-control ml-3" v-model="currentDrive">
    							<option v-bind:key="0" v-bind:value="0" selected>Please Select...</option>
    							<option v-for="drive in drives" v-bind:key="drive.id" v-bind:value="drive.id">
                                    @{{ drive.name }}
                                </option>
    						</select>
							<h3 class="d-inline mb-0 ml-3" v-if="currentDrive > 0">
								@{{ newUploadsMessage }}
							</h3>
    					</div>
    				</form><hr />
    			</div>
    		</div>

			<div v-if="currentDrive > 0">
				<div class="card" role="tablist">
					<h5 class="card-header mb-0">
						<a data-toggle="collapse" href="#movie-form" role="tab">
							Movies (@{{ movies.length }} pending)
						</a>
					</h5>
					<movie-form
						id="movie-form"
						class="card-body collapse"
						role="tabpanel"
						v-bind:collections="collections"
						v-bind:drive="currentDrive"
						v-bind:files="movies"
						v-bind:genres="genres"
					></movie-form>
				</div>

				<div class="card" role="tablist">
					<h5 class="card-header mb-0">
						<a data-toggle="collapse" href="#episode-form" role="tab">
							Episodes (@{{ episodes.length }} pending)
						</a>
					</h5>
					{{--				<episode-form id="episode-form" class="card-body"></episode-form>--}}
				</div>
			</div>
    	</div>

        <script>
            window.__INITIAL_STATE__ = <?= $initialState ?>;
        </script>
        <script src='{{ asset('js/app.js') }}'></script>
        <script src="{{ asset('js/upload.js') }}"></script>

    @endif

@endsection

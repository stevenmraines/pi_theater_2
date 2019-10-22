@extends('admin.master')
@section('content')

    @if(!auth()->check())

        <?php die(); ?>

    @else

		{{-- Main Vue container --}}
        <div id="app" class="container mt-3">

			{{-- Drive selection row --}}
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
    					</div>
    				</form><hr />
    			</div>
    		</div>

			{{-- Total new uploads --}}
			<div class="row" v-if="currentDrive > 0">
				<div class="col">
					<h3>
						@{{ newUploadsMessage }}
					</h3><hr class="mt-0" />
				</div>
			</div>

			{{-- Movie row --}}
    		<div class="row" v-if="currentDrive > 0 && movieCount > 0">
    			<div class="col">
    				<form novalidate>
    					<div class="form-group">
    						<label for="filename">File</label>
    						<select
                                id="filename"
                                class="form-control"
                                v-model="currentMovie.filename"
							>
								<option
									v-for="file in pending[currentDrive].movies"
									v-bind:key="file"
									v-bind:value="file"
								>@{{ file }}</option>
							</select>
    					</div>

    					<div class="form-group">
    						<label for="title">Title</label>
    						<input
                                id="title"
                                class="form-control"
                                name="title"
                                v-model="currentMovie.title"
                                required
                            />
    					</div>

    					<div class="text-danger mb-3" v-if="false">
    						The title is required
    					</div>

    					<div class="form-group">
    						<label for="year-released">Year Released
                                <a
                                    v-bind:href="'https://www.google.com/search?q=' + currentMovie.title + '+year+released'"
                                    target="_blank"
                                >(search)</a>
                            </label>
    						<input
                                type="number"
                                id="year-released"
                                class="form-control"
                                min="1900"
                                max="{{ date('Y') }}"
                                v-model="currentMovie.yearReleased"
                                required
                            />
    					</div>

    					<div class="form-group">
    						<label for="movie-summary">Summary</label>
    						<textarea
                                id="movie-summary"
                                class="form-control"
                                rows="4"
                                v-model="currentMovie.summary"
                                required
                            ></textarea>
    					</div>

    					<div class="form-group">
    						<label for="movie-poster">Poster Image
                                <a
                                    v-bind:href="'https://www.google.com/search?q=' + currentMovie.title + '+poster&tbm=isch'"
                                    target="_blank"
                                >(search)</a>
                            </label>
    						<input
                                type="file"
                                id="movie-poster"
                                class="form-control-file"
                            />
    					</div>

    					<div class="text-danger mb-3" v-if="false">
    						The poster image is required
    					</div>

    					<label for="genres">Genres</label>
    					<div v-for="g in currentMovie.genres">
    						<form name="genre_form">
    							<div class="input-group mb-3">
    								<div class="input-group-prepend">
    									<button
                                            type="button"
                                            class="btn btn-primary dropdown-toggle"
                                            data-toggle="dropdown"
                                        >
											Options
										</button>
    									<div class="dropdown-menu">
    										<a
                                                href="#"
                                                class="dropdown-item"
                                                v-for="genre in genres"
                                            >
                                                @{{ genre.name }}
                                            </a>
    									</div>
    								</div>
    								<input
                                        id="genres"
                                        class="form-control"
                                        name="genres"
										v-bind:value="g.name"
                                    />
    								<div class="input-group-append">
    									<button
											class="btn btn-primary"
											type="button"
											v-on:click="addCurrentMovieGenre()"
										>+</button>
    								</div>
    							</div>
    						</form>
    					</div>

    					<label for="movie-collections">Collections</label>
    					<div v-for="c in currentMovie.collections">
    						<form name="col_form">
    							<div class="input-group mb-3">
    								<div class="input-group-prepend">
    									<button
                                            type="button"
                                            class="btn btn-primary dropdown-toggle"
                                            data-toggle="dropdown"
                                        >
											Options
										</button>
    									<div class="dropdown-menu">
    										<a
                                                href="#"
                                                class="dropdown-item"
                                                v-for="collection in collections"
                                            >
                                                @{{ collection.name }}
                                            </a>
    									</div>
    								</div>
    								<input
										type="text"
										id="movie-collections"
										class="form-control"
										v-bind:value="c.name"
									/>
    								<div class="input-group-append">
    									<button
											class="btn btn-primary"
											type="button"
											v-on:click="addCurrentMovieCollection()"
										>+</button>
    								</div>
    							</div>
    						</form>
    					</div>

    					<div class="form-group d-flex justify-content-around mt-3">
    						<button class="btn btn-success" v-if="true">
                                Submit
                            </button>
    					</div>

    					<div class="mb-3 d-xs-block d-md-none font-italic text-muted text-center">
    						(@{{ currentMovie.filename }})
    					</div>
    				</form>
    			</div>
    		</div>  {{-- end Movie row --}}

			{{-- <div class="row" v-if="false">
				<div class="col">
					<h3>
						{{ shows.length > 0 ? shows.length : 'No' }} New Show{{ shows.length === 1 ? '' : 's' }}
					</h3><hr class="mt-0" />
					<form name="show_form" ng-show="shows.length > 0" novalidate>

					</form>
				</div>
			</div> --}}

			{{-- <div class="row" v-if="false">
                <div class="col">
                    <h3>
                        {{ episodes.length > 0 ? episodes.length : 'No' }} New Episode{{ episodes.length === 1 ? '' : 's' }}
                    </h3><hr class="mt-0" />
                    <form name="episode_form" ng-show="episodes.length > 0" novalidate>

                    </form>
                </div>
            </div> --}}

    	</div>  {{-- end #app div --}}

        <script>
            window.__INITIAL_STATE__ = <?= $initialState ?>;
        </script>
        <script src='{{ asset('js/app.js') }}'></script>
        <script src="{{ asset('js/upload.js') }}"></script>

    @endif

@endsection

<nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
	<a href="{{ route('browse') }}" class="navbar-brand img-fluid mr-4 py-0">
		<img
			id="nav-logo"
			class="d-inline-block"
			src="{{ asset('img/brand.png') }}"
		/>
	</a>
	<button
		class="navbar-toggler"
		type="button"
		data-toggle="collapse"
		data-target="#nav-content"
	>
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="nav-content">
		<div class="navbar-nav">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item dropdown my-auto">
					<a
						id="genres-menu"
						class="nav-link dropdown-toggle"
						href="javascript:void(0);"
						data-toggle="dropdown"
					>
						Genres
					</a>
					<div
						id="genres-menu-container"
						class="dropdown-menu dropdown-menu-left px-2"
					>
						<table class="table">
							<tbody>
								<tr scope="row">
									<td v-for="column in genreColumns" class="px-1 pb-0">
										<div v-for="genre in column">
											<a
												class="nav-link"
												href="javascript:void(0);"
												v-on:click="getGenre(genre.id)"
											>
												@{{ genre.name }}
											</a>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</li>
				<li class="nav-item dropdown my-auto">
					<a
						id="collections-menu"
						class="nav-link dropdown-toggle"
						href="javascript:void(0);"
						data-toggle="dropdown"
					>
						Collections
					</a>
					<div
						id="collections-menu-container"
						class="dropdown-menu dropdown-menu-left scrollbar"
					>
						<a href="javascript:void(0);" v-for="collection in collections">
							<img
								class="dropdown-item menu-logo"
								v-bind:src="paths.logos + '/' + collection.menu_image"
								v-on:click="getCollection(collection.id)"
							/>
						</a>
					</div>
				</li>
				<li class="nav-item dropdown">
					<a
						id="search-menu"
						class="nav-link py-0"
						href="javascript:void(0);"
						v-on:click="search"
					>
						<img src="{{ asset('img/search.png') }}" class="img-fluid" />
					</a>
				</li>
			</ul>
		</div>
		<ul class="navbar-nav ml-auto d-flex align-items-center">
			@if(!auth()->check())
				<li class="nav-item align-top">
					<a
						href="{{ route('login') }}"
						id="show-login-modal"
						class="nav-link"
					>Login</a>
				</li>
				<li class="nav-item align-top">
					<a
						href="{{ route('register') }}"
						id="show-register-modal"
						class="nav-link"
					>Register</a>
				</li>
			@else
				<li class="nav-item align-top">
					<a
						class="nav-link"
						href="javascript:void(0);"
						v-on:click="showWatchlist"
					>Watchlist</a>
				</li>
				<li class="nav-item dropdown">
					<a
						id="user-options-menu"
						class="nav-link dropdown-toggle py-0"
						href="javascript:void(0);"
						data-toggle="dropdown"
					>
						<img id="nav-user-icon" src="{{ asset('img/user.png') }}" />
					</a>
					<div
						class="dropdown-menu dropdown-menu-right"
					>
						<h4 class="dropdown-item">{{ auth()->user()->name }}</h4><hr />
						@if(auth()->user()->admin)
							<h6 class="dropdown-header">Admin Functions</h6>
							<a class="dropdown-item" href="{{ route('upload') }}">
								Upload Content
							</a><hr />
						@endif
						{{-- <a
							class="dropdown-item"
							href="javascript:void(0);"
						>Change Email</a>
						<a
							class="dropdown-item"
							href="javascript:void(0);"
						>Change Password</a><hr /> --}}
						<a
							id="logout-button"
							class="dropdown-item"
							href="{{ route('logout') }}"
							onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
						>
							Logout
						</a>
						<form
							id="logout-form"
							style="display: none;"
							action="{{ route('logout') }}"
							method="POST"
						>
							@csrf
						</form>
					</div>
				</li>
			@endif
		</ul>
	</div>
</nav>

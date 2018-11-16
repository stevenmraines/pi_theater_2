<nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
	<a href="/" class="navbar-brand img-fluid mr-4 py-0">
		<img id="nav-logo" src="{{ asset('img/brand.png') }}" class="d-inline-block" />
	</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="nav-content">
		<div class="navbar-nav">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item dropdown my-auto">
					<a href="#" class="nav-link dropdown-toggle" id="genres-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Genres
					</a>
					<div id="genres-menu-container" aria-labelledby="genres-menu" class="dropdown-menu dropdown-menu-left px-2">
						<table class="table">
							<tbody>
								<tr scope="row">
									<td v-for="column in genre_columns" class="px-1 pb-0">
										<div v-for="genre in column">
											<a href="#" class="nav-link">@{{ genre.name }}</a>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</li>
				<li class="nav-item dropdown my-auto">
					<a href="#" class="nav-link dropdown-toggle" id="collections-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Collections
					</a>
					<div id="collections-menu-container" class="dropdown-menu dropdown-menu-left scrollbar" aria-labelledby="collections-menu">
						<a href="#" v-for="collection in collections">
							<img v-bind:src="'/img/logos/' + collection.logo" class="dropdown-item menu-logo" />
						</a>
					</div>
				</li>
				<li class="nav-item dropdown">
					<a href="#" class="nav-link py-0" id="search-menu">
						<img src="{{ asset('img/search.png') }}" class="img-fluid" />
					</a>
				</li>
			</ul>
		</div>
		<ul class="navbar-nav ml-auto d-flex align-items-center">
			@if(!$user)
				<li class="nav-item align-top">
					<a href="#" class="nav-link" id="show-login-modal" data-toggle="modal" data-target="#login-modal">Login</a>
				</li>
				<li class="nav-item align-top">
					<a href="#" class="nav-link" id="show-register-modal" data-toggle="modal" data-target="#register-modal">Register</a>
				</li>
			@else
				<!--include('layouts.email_change')
				include('layouts.password_change')-->
				<li class="nav-item align-top">
					<a href="#" class="nav-link" v-on:click="getWatchlist()">Watchlist</a>
				</li>
				<li class="nav-item dropdown">
					<a href="#" class="nav-link dropdown-toggle py-0" id="user-options-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<img id="nav-user-icon" src="{{ asset('img/user.png') }}" />
					</a>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="user-options-menu">
						@if(Auth::user()->admin)
							<h6 class="dropdown-header">Admin Functions</h6>
							<a class="dropdown-item" href="/update_tables.php">Update Tables</a><hr />
						@endif
						<a href="#" class="dropdown-item" href="#" data-toggle="modal" data-target="#change_email_modal">Change Email</a>
						<a href="#" class="dropdown-item" href="#" data-toggle="modal" data-target="#change_password_modal">Change Password</a><hr />
						<a
								id="logout-button"
								class="dropdown-item"
								href="{{ route('logout') }}"
								onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
							Logout
						</a>
						<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
							@csrf
						</form>
					</div>
				</li>
			@endif
		</ul>
	</div>
</nav>

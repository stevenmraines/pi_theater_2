<div id="collections-carousel" class="carousel slide mb-5" data-ride="carousel">
	<ol class="carousel-indicators">
		<li
				v-for="(col, index) in collections"
				v-bind:class="{ active: index === 0 }"
				data-target="#collections-carousel"
				v-bind:data-slide-to="index">
			{{-- @{{ index }} --}}
		</li>
	</ol>
	<div class="carousel-inner" role="listbox">
		<div class="carousel-item" v-bind:class="{ active: index === 0 }"
				v-for="(col, index) in collections">
			<div class="collection-info-container">
				<div class="d-flex flex-column justify-content-center">
					<img v-bind:src="'/img/logos/' + col.logo"
							class="collection-logo img-fluid" />
					<div class="collection-summary my-5">@{{ col.summary }}</div>
					<button class="btn btn-primary collection-explore mt-5" onclick="">
						Explore this Collection
					</button>
				</div>
			</div>
			<img v-bind:src="'/img/logos/' + col.jumbotron"
					class="collection-jumbotron d-none d-lg-inline" />
		</div>
	</div>
</div>

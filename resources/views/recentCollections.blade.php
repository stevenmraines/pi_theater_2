<div
	id="collections-carousel"
	class="carousel carousel-fade slide mb-5"
	data-ride="carousel"
>
	<ol class="carousel-indicators">
		<li
			v-for="(col, index) in recentCollections"
			v-bind:class="{ active: index === 0 }"
			data-target="#collections-carousel"
			v-bind:data-slide-to="index"
		></li>
	</ol>
	<div class="carousel-inner" role="listbox">
		<div
			class="carousel-item"
			v-for="(col, index) in recentCollections"
			v-bind:class="{ active: index === 0 }"
		>
			<div class="collection-info-container hidden">
				<div class="d-flex flex-column justify-content-center">
					<img
						class="collection-logo img-fluid"
						v-bind:src="'/img/logos/' + col.menu_image"
					/>
					<div class="collection-summary my-5">@{{ col.summary }}</div>
					<button class="btn btn-primary collection-explore mt-5" onclick="">
						Explore this Collection
					</button>
				</div>
			</div>
			<img
				class="collection-jumbotron d-none d-lg-inline"
				v-bind:src="'/img/logos/' + col.jumbotron_image"
			/>
		</div>
	</div>
</div>

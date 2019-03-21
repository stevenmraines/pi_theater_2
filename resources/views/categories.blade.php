<div class="row mx-0 my-5">
  <div class="col-xs-12 col-md-6 col-lg-4" v-on:click="fluidModalRecentEpisodes">
    <img
      src="{{ asset('img/banners/new-eps-banner.jpg') }}"
      class="banner img-fluid"
    />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4" v-on:click="fluidModalRecentGenre(13)">
    <img
      src="{{ asset('img/banners/new-horror-banner.jpg') }}"
      class="banner img-fluid"
    />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4" v-on:click="fluidModalRecentGenre(20)">
    <img
      src="{{ asset('img/banners/new-sci-fi-banner.jpg') }}"
      class="banner img-fluid"
    />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4" v-on:click="fluidModalRecentMovies">
    <img
      src="{{ asset('img/banners/recent-movies-banner.jpg') }}"
      class="banner img-fluid"
    />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4" v-on:click="fluidModalRecentShows">
    <img
      src="{{ asset('img/banners/recent-shows-banner.jpg') }}"
      class="banner img-fluid"
    />
  </div>
</div>

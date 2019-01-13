<div class="row mx-0 my-5">
  <div class="col-xs-12 col-md-6 col-lg-4">
    <img src="{{ asset('img/banners/new-eps-banner.jpg') }}" class="banner img-fluid" />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4">
    <img
      src="{{ asset('img/banners/new-horror-banner.jpg') }}"
      class="banner img-fluid"
      v-on:click="newGenre(13)"
    />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4">
    <img
      src="{{ asset('img/banners/new-sci-fi-banner.jpg') }}"
      class="banner img-fluid"
      v-on:click="newGenre(20)"
    />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4">
    <img src="{{ asset('img/banners/recent-movies-banner.jpg') }}" class="banner img-fluid" />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4">
    <img src="{{ asset('img/banners/recent-shows-banner.jpg') }}" class="banner img-fluid" />
  </div>
</div>

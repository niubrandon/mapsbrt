$(() => {
  const $profileView = $(`
  <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" data-toggle="tab" role="tab" id="Mymaps" href="#my_maps_list">My Maps</a>
  </li>
  <li class="nav-item">
  <a class="nav-link" data-toggle="tab" role="tab" id="favMapList" href="#my_fav_list">Favorites</a>
  </li>
</ul>
<br>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="my_maps_list" role="tabpanel"></div>
  <div class="tab-pane fade" id="my_fav_list" role="tabpanel"></div>
</div>

  `);

  window.$profileView = $profileView;

  window.profileList = {};

  function clearDiv (dom) {
    $(".tab-pane").removeClass("show active");
    $('a').removeClass("active");
    $(dom).addClass("active");
    $div = $($(dom).attr("href"));
    $div.addClass('show active');
    $div.empty();
  }

function getListOfUserMaps(div) {
  getAllUserMaps()
    .then(function( json ) {
      mapListings.ListAllMaps(json.maps);
      $mapListings.appendTo(div);
    })
    .catch(error => error);
}

function getListOfFavouriteMaps(div) {
  getAllFavMaps()
  .then(function( json ) {
    mapListings.ListAllMaps(json.maps, true);
    $mapListings.appendTo(div);
  })
  .catch(error => error);
}


  window.profileList.clearDiv = clearDiv;
  window.profileList.getListOfUserMaps = getListOfUserMaps;
  window.profileList.getListOfFavouriteMaps = getListOfFavouriteMaps;

});

$(() => {

  // const {displayMap} = require('../map.js');

  const $mapListings = $(`
  <div class="row row-cols-1 row-cols-md-3 g-4" id="map_section">
      <p>Loading...</p>
  </div>
  `);

  window.$mapListings = $mapListings;

  window.mapListings = {};

  function allMaps(listing) {
    $mapListings.append(listing);
  }
  function clearListings() {
    $mapListings.empty();
  }

  window.mapListings.clearListings = clearListings;

  function ListAllMaps(Maps, isFav = false) {
    clearListings();
    for (const mapId in Maps) {
      const map = Maps[mapId];
      const listing = mapListing.ListMap(map, isFav);
      allMaps(listing);
    }
  }

  window.mapListings.ListAllMaps = ListAllMaps;

  $(document).on("click",".btn-primary",
    function() {
      // console.log($(this).val());
      // clearMap();
      window.$mapObj.displayMap($(this).val());
    }
  );
});

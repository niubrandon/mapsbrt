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

  function ListAllMaps(Maps, user, profile) {
    clearListings();
    for (const mapId in Maps) {
      const map = Maps[mapId];
      const listing = mapListing.ListMap(map, user, profile);
      allMaps(listing);
    }
  }

  window.mapListings.ListAllMaps = ListAllMaps;

  $(document).on("click",".details-button",
    function() {
      window.$mapObj.displayMap($(this).val());
    }
  );
//trigger the specific div
  function reload() {
    if ($("#map_section").parent().is("main")) {
      index.loadIndex(true);
    } else {
      let origin = $("#map_section").parent().attr('data-origin');
      $('#'+origin).click();
    }
  }
 //fav map function
  $(document).on("click", ".fav_button", function() {
    let value = $(this).attr("value");
    let mapId = $(this).attr("data-mapId");
    toastr.remove();
    if (value === "1") {
      addTofav(mapId)
        .then(result => {
        toastr.success('Successfully added into fav');
        reload();
      })
      .catch(error => {
        toastr.error("Something Happened!");
      })
    } else {
      removeFromFav(mapId)
        .then(result => {
          toastr.success('Removed From Favorites');
          reload();
        })
        .catch(error => {
          toastr.error("Something Happened!");
        })
    }
  })
  //delete
  $(document).on("click", ".delete-button", function() {
    if (confirm("Are you sure You want to delete the map?")) {
      let mapId = $(this).attr("value");
      let userId = $("#logged-userId").attr("value");
      toastr.remove();
      deleteMap(userId, mapId)
        .then(success => {
          reload();
          toastr.success("Map Deleted");
        })
        .catch(error => {
          toastr.error(error.message);
        })
    }
  })
  //update map
  $(document).on("click", ".mapedit-button", function() {
    const mapId = $(this).attr("value");
    getMapDetailswithMapId(mapId)
      .then(result => {
        let mapDetail = result.maps[0];
        const modal = mapdetails.editMap(mapDetail);
        $mapListings.append(modal);
        $("#updateMapModal").css("display", "block");
      })
  })
  $(document).on('click', '.close', function() {
    $("#updateMapModal").css("display", "none");
    $("#updateMapModal").remove();
  });

  $(document).on('submit', "#edit-map-form", function(event) {
    event.preventDefault();
    const serializedData = $("#edit-map-form").serialize();
    const creatorId = $("#logged-userId").attr("value");
    const map_id = $("#mapId").attr("value");
    updateMapDetails(creatorId, map_id , serializedData)
      .then(result => {
        reload();
        toastr.success("Successfully Edited");
      })
      .catch(err => {
        toastr.erro(err.message);
      })
  })
});

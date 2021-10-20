$(() => {
  window.index = {};

  function loadIndex(user) {
    const $main = $("main");
    getAllMaps()
    .then(function( json ) {
      mapListings.ListAllMaps(json.maps, user, false);
      $mapListings.appendTo($main);
    });
  }
  window.index.loadIndex = loadIndex;

});

$(() => {
  const $main = $('#main-content');

  getAllMaps()
  .then(function( json ) {
    mapListings.ListAllMaps(json.maps);
    $mapListings.appendTo($main);
  });

});

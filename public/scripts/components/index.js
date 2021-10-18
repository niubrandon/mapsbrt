$(() => {
  const $main = $('#main-content');

  getAllMaps()
  .then(function( json ) {
    // console.log(json.maps);
    mapListings.ListAllMaps(json.maps);
    $mapListings.appendTo($main);
  });

});

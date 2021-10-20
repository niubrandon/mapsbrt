$(() => {
const $main = $('#main-content');
window.index = {};

function loadIndex(user) {
  const $main = $("main");
  getAllMaps()
  .then(function( json ) {
    mapListings.ListAllMaps(json.maps, user);
    $mapListings.appendTo($main);
  });
}

window.index.loadIndex = loadIndex;

});

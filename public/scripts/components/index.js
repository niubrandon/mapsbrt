$(() => {
const $main = $('#main-content');
window.index = {};

function loadIndex(user) {
  const $main = $("main");
  getAllMaps()
  .then(function( json ) {
    mapListings.ListAllMaps(json.maps, false, user);
    $mapListings.appendTo($main);
  });
}

loadIndex(null);

window.index.loadIndex = loadIndex;

});

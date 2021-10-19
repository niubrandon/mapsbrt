$(() => {
const $main = $('#main-content');
window.index = {};
function loadIndex() {
  const $main = $("main");
  getAllMaps()
  .then(function( json ) {
    mapListings.ListAllMaps(json.maps);
    $mapListings.appendTo($main);
  });
}

loadIndex();

window.index.loadIndex = loadIndex;

});

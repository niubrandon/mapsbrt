//Ajax calls here
function getAllMaps () {
  return $.ajax({
    url: "/api/maps",
  });
}

function getAllUserMaps () {
  return $.ajax({
    url: "/api/maps/usermaps",
  });
}

function getAllFavMaps () {
  return $.ajax({
    url: "/api/users/fav/maps",
  });
}

function getMyDetails() {
  return $.ajax({
    url: "api/users/me",
  });
}

function addTofav (mapId) {
  return $.ajax({
    method: "POST",
    url: `api/users/fav/${mapId}/add`,
  });
}

function removeFromFav(mapId) {
  return $.ajax({
    method: "POST",
    url: `api/users/fav/${mapId}/remove`,
  });
}

function deleteMap(userId, mapId) {
  return $.ajax({
    method: "POST",
    url: `api/maps/${userId}/deletemap/${mapId}`,
  })
}

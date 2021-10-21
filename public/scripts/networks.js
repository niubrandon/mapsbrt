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

//added?_method=DELETE to have restful style
function deleteMap(userId, mapId) {
  return $.ajax({
    method: "POST",
    url: `api/maps/${userId}/deletemap/${mapId}?_method=DELETE`,
  })
}

///get map details with mapId
function getMapDetailswithMapId(mapId) {
  return $.ajax({
    url: `api/maps/${mapId}`,
  });
}

function updateMapDetails(user_id, map_id, data) {
  return $.ajax({
    method: "PUT",
    url: `/api/maps/${user_id}/updatemap/${map_id}`,
    data,
  });
}

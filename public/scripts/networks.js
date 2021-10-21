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

const addPoint = function(currMapID,addInput) {
  console.log('addpointfunction');
  return $.ajax({
    method: "POST",
    url: `/api/maps/${currMapID}/points`,
    data: addInput
  });
};

const deletePoint = function(pointId) {
  // console.log('deletefunction');
  return $.ajax({
    method: "DELETE",
    url: `api/maps/points/${pointId}/delete`,
  });
};

const updatePoint = function(pointId,updateInput) {
  console.log('updatefunction');
  return $.ajax({
    method: "PUT",
    url: `api/maps/points/${pointId}/update`,
    data: updateInput
  });
};

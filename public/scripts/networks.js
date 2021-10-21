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

// Map functions ---------------------------
const getMapbyID = function(id) {
  return $.ajax({
    url: `/api/maps/${id}`,
  });
};

const getPointsbyMapID = function(id) {
  return $.ajax({
    url: `/api/maps/${id}/points`,
  });
};

// Point functions ---------------------------
const addPoint = function(currMapID,addInput) {
  return $.ajax({
    method: "POST",
    url: `/api/maps/${currMapID}/points`,
    data: addInput
  });
};

const deletePoint = function(pointId) {
  return $.ajax({
    method: "DELETE",
    url: `api/maps/points/${pointId}/delete`,
  });
};

const updatePoint = function(pointId,updateInput) {
  return $.ajax({
    method: "PUT",
    url: `api/maps/points/${pointId}/update`,
    data: updateInput
  });
};

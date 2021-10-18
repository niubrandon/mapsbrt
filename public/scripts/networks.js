//Ajax calls here
function getAllMaps () {
  console.log("getMaps");
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

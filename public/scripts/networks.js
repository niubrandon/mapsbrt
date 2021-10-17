//Ajax calls here
function getAllMaps () {
  console.log("getMaps");
  return $.ajax({
    url: "/api/maps",
  });
}

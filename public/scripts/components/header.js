
$(document).ready(function() {

    window.header = {};

    const $pageHeader = $('#page-header');
    let currentUser = null;
    function updateHeader(user) {
      currentUser = user;
      $pageHeader.find("#nav-items-div").remove();
      let userLinks;
      if (!user) {
        userLinks = `
        <div class="container-fluid" id="nav-items-div">
          <a class="navbar-brand" href="" id="home">
            <img src="./images/map_logo.png" alt="" width="50" height="50" class="d-inline-block">
            Maps
          </a>
          <div class="ml-auto">
            <button id="register" class="btn btn-primary" type="submit">Register</button>
            <button id="login" class="btn btn-primary" type="submit">Login</button>
          </div>
        </div>`
      } else {
        userLinks = `<div class="container-fluid" id="nav-items-div">
        <a class="navbar-brand" href="" id="home">
          <img src="./images/map_logo.png" alt="" width="50" height="50" class="d-inline-block">
          Maps
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" id="profile">Profile</a>
            </li>
            <li class="nav-item" id="create_map_form">
              <a class="nav-link active" href="#" id="create-a-map">Create a Map</a>
            </li>
          </ul>
        </div>
        <ul class="nav navbar-nav navbar-right navbar-dark bg-dark">
          <li>${user.name}</li>
          <li></li>
        </ul>

        <div class="ml-auto">
          <button id="logout-button" class="btn btn-primary" type="submit">logout</button>
        </div>
      </div>`
      }

      $pageHeader.append(userLinks);
    }


  window.header.update = updateHeader;


  getMyDetails()
    .then(function( json ) {
      updateHeader(json.user);
    });

  //logout
  $(document).on("click", "#logout-button", (event) => {
    console.log("logoutbutton clicked");
    const serializeData = $(this).serialize();

    $.post("/api/users/logout", serializeData, (success) => {
      console.log("response from server", success);
      updateHeader(null);
      $("main").empty();
      index.loadIndex(null);
    });
    //post ajax to remove cookie
  });

  const $main = $('main');
  //profile section
  $(document).on("click", "#profile", (event) => {
    event.preventDefault();
    $main.empty();
    $profileView.appendTo($main);
    $("#Mymaps").click();
  })

  //tab clicking
  $(document).on("click", "#Mymaps", function(event) {
    event.preventDefault();
    profileList.clearDiv(this);
    profileList.getListOfUserMaps($($(this).attr("href")));
  });

  $(document).on("click", "#favMapList", function(event) {
    event.preventDefault();
    profileList.clearDiv(this);
    profileList.getListOfFavouriteMaps($($(this).attr("href")));
  });

  $(document).on('click', "#home", (event) => {
    event.preventDefault();
    $main.empty();
    getAllMaps()
      .then(function( json ) {
      mapListings.ListAllMaps(json.maps);
      $mapListings.appendTo($main);
    });
  })

});

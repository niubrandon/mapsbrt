
$(() => {

  const $mapObj = $(`
  <div id="map"></div>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8o57_awNF0j94rrWH3t0DUIR5VWgqeM0&callback=initMap&v=weekly"
      defer
    ></script>
  `);

  window.$mapObj = $mapObj;

  const clearMap = function() {
    $('#map').remove();
  };

  window.$mapObj.clearMap = clearMap;

  const appendMap = () => {
    $('main').prepend(window.$mapObj);
  };

  window.$mapObj.appendMap = appendMap;

  // mapPromise removes the #map element and prepends a
  // new #map div to the main tag
  const mapPromise = () => new Promise((resolve, reject) => {
    // console.log('promiseerror?');
    window.$mapObj.clearMap();
    window.$mapObj.appendMap();
    setTimeout(() => {
      resolve();
    },100);
  });
  window.$mapObj.mapPromise = mapPromise;

  // function init Map creates a google map in the #map element
  // with center at (lat,long) and a zoom level of (zoom)
  const initMap = function(
    lat,
    lng,
    zoom,
    points = []) {
    // Make map
    // console.log('in init maps');
    const map = new google.maps.Map(
      document.getElementById("map"),
      {
        center: {lat,lng},
        zoom: zoom,
      });

    // Marker image it's a flag
    const image = {
      url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32),
    };

    // Image clickable region for flag
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly",
    };
    let markerList = [];

    // Make points in map
    for (let elem of points) {
      markerList.push(new google.maps.Marker({
        position: {
          lat : elem.point_lat,
          lng : elem.point_lng
        },
        icon: image,
        map: map,
        title: elem.title,
        description: elem.description,
        imageUrl: elem.image_url,
        shape: shape,

      }));
    }


    // Texbox content Generated for each point in database
    for (let elem of markerList) {
      const contentString =
      `<form id="points-form"  method="PUT" action="/api/maps/${window.$mapObj.mapid}/points">
      <div id="content">
      <div class = title>${elem.title}</div>
      <div class = description>${elem.description}</div>
      <img class = imageUrl src = ${elem.imageUrl}></div>
      <button class="btn btn-primary" value = "${window.$mapObj.mapid}" type="submit">UPDATE</button>
      </div>`;
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      elem.addListener("click", () => {
        map.setZoom(zoom);
        map.setCenter(elem.getPosition());
        infowindow.open({
          anchor: elem,
          map: map,
          shouldFocus: false,
        });
      });
    }

    // Making points for map onclick listeners
    let tempPoints = [];

    // Add markers for map on click listener
    const addMarker = (array, pos) => {
      const currMarker = new google.maps.Marker({
        map: map,
        position: pos
      });

      // Form for new point
      const pointForm = `<form id="points-form"  method="POST" action="/api/maps/${window.$mapObj.mapid}/points">
      <div>ADD A POINT, Map ID: ${window.$mapObj.mapid}</div>
      <input id="point-title"  name="point_title" required type="text" class="form-control" placeholder="title" aria-label="title" aria-describedby="basic-addon1">
      <input name="description" type="text" required class="form-control" placeholder="a short description" aria-label="description" aria-describedby="basic-addon1">
      <input name="imageUrl" type="text" required class="form-control" placeholder="image url" aria-label="image" aria-describedby="basic-addon1">
      <input name="lat" type="float" required class="form-control" value="${pos.lat}" aria-label="image" aria-describedby="basic-addon1">
      <input name="lng" type="float" required class="form-control" value="${pos.lng}" aria-label="image" aria-describedby="basic-addon1">
      <button class="btn btn-primary" value = "${window.$mapObj.mapid}" type="submit">submit</button>
      `;
      const newInfo = new google.maps.InfoWindow({
        content: pointForm,
      });

      // Temppoint on click
      currMarker.addListener("click", () => {
        map.setZoom(zoom);
        map.setCenter(currMarker.getPosition());
        newInfo.open({
          anchor: currMarker,
          map: map,
          shouldFocus: false,
        });
      });
      array.push(currMarker);
    };
    window.tempPoints = tempPoints;

    // Default point in center
    addMarker(tempPoints, map.center);

    // Map on click
    google.maps.event.addListener(
      map,
      "click",
      (event) => {
        // Remove existing temp point
        for (let elem of tempPoints) {
          // Have to use the setMap function to remove
          elem.setMap(null);
        }
        tempPoints = [];
        addMarker(tempPoints, event.latLng);
      }
    );
    return;
  };

  // newInfo.preventDefault;
  // Submitting new form
  $(document).on(
    "submit",
    "#points-form",
    function(event) {
      const currMapID = document.querySelector("#points-form > button").value;
      event.preventDefault();
      const serializeData = $("#points-form").serialize();
      $.post(`/api/maps/${currMapID}/points`,
        serializeData,
        (success) => {
          console.log(success);
        });
    });

  window.$mapObj.initMap = initMap;


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

  // display Map takes in a single number(mapID)
  // and prepend a google maps element to the $main tag
  // where the map displayed has id mapID
  const displayMap = (mapID) => {
    window.$mapObj.mapid = mapID;
    window.$mapObj.mapPromise()
      .then(() => {
        return Promise.all([
          getMapbyID(mapID),
          getPointsbyMapID(mapID)
        ]);
      }).then(results => {
        // Display a new map
        let lat, lng, zoom;
        ({lat, lng, zoom} = results[0].maps[0]);
        let points = results[1].points;
        $mapObj.initMap(lat, lng, zoom, points);
        return;
      }).catch((error)=> {
        console.log('here is err', error);
      });
  };
  window.$mapObj.displayMap = displayMap;
});



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
    $('#map').empty();
  };

  window.$mapObj.clearMap = clearMap;

  $('main').prepend(window.$mapObj);

  // mapPromise removes the #map element and prepends a
  // new #map div to the main tag
  const mapPromise = new Promise((resolve, reject) => {
    window.$mapObj.clearMap();
    // $('main').prepend(mapHtml);
    setTimeout(() => {
      resolve();
    },100);
  });


  // function init Map creates a google map in the #map element
  // with center at (lat,long) and a zoom level of (zoom)
  const initMap = function(
    lat,
    lng,
    zoom,
    points = []) {
    // Make map
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
        shape: shape,

      }));
    }

    for (let elem of markerList) {
      // Texbox content Generated for each
      const contentString =
      `<div id="content">
      ${elem.title}
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

    const addMarker = (array, pos) => {
      const currMarker = new google.maps.Marker({
        map: map,
        position: pos
      });

      const pointForm = `<form id="points-form" method="post" action="/api/maps/${window.$mapObj.mapid}/points">
      <div>this is map id ${window.$mapObj.mapid}</div>
      <input id="point-title" name="point-title" required type="text" class="form-control" placeholder="title" aria-label="title" aria-describedby="basic-addon1">
      <input name="description" type="text" required class="form-control" placeholder="a short description" aria-label="description" aria-describedby="basic-addon1">
      <button class="btn btn-primary" type="submit">submit</button>
      `;

      const newInfo = new google.maps.InfoWindow({
        content: pointForm,
      });

      currMarker.addListener("click", () => {
        map.setZoom(zoom);
        map.setCenter(currMarker.getPosition());
        newInfo.open({
          anchor: currMarker,
          map: map,
          shouldFocus: false,
        });
        newInfo.preventDefault;
        // Submitting new form
        $(document).on(
          "submit",
          "#points-form",
          function(event) {
            event.preventDefault();
            console.log('here?');
            console.log('submitting vals');
            const serializeData = $("#points-form").serialize();
            console.log(serializeData);
          });
        // console.log(newInfo);
      });
      array.push(currMarker);
    };

    window.tempPoints = tempPoints;

    addMarker(tempPoints, map.center);

    google.maps.event.addListener(
      map,
      "click",
      (event) => {
        // console.log('map id',window.$mapObj.mapid);
        for (let elem of tempPoints) {
          // Have to use the setmap function
          elem.setMap(null);
        }
        tempPoints = [];
        // console.log(event.latLng);
        addMarker(tempPoints, event.latLng);
      }
    );
    // console.log(markerList);
  };



  window.$mapObj.initMap = initMap;


  const getMapbyID = function(id) {
    // console.log("get map by id");
    return $.ajax({
      url: `/api/maps/${id}`,
    });
  };

  const getPointsbyMapID = function(id) {
    // console.log("get map by id");
    return $.ajax({
      url: `/api/maps/${id}/points`,
    });
  };


  // display Map takes in a single number(mapID)
  // and prepend a google maps element to the $main tag
  // where the map displayed has id mapID
  const displayMap = (mapID) => {
    window.$mapObj.mapid = mapID;
    mapPromise
      .then(() => {
        return Promise.all([
          getMapbyID(mapID),
          getPointsbyMapID(mapID)
        ]);
      }).then(results => {
        // console.log('all result', results);
        let lat, lng, zoom;
        ({lat, lng, zoom} = results[0].maps[0]);
        let points = results[1].points;
        // console.log(lat,lng,zoom);
        // let points = [];
        // console.log('points', points);
        $mapObj.initMap(lat, lng, zoom, points);
      });
  };
  window.$mapObj.displayMap = displayMap;
  const testID1 = 1;
  // testing run

  window.$mapObj.displayMap(testID1);

});


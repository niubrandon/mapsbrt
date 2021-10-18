
$(() => {
  const mapHtml = `
  <div id="map"></div>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8o57_awNF0j94rrWH3t0DUIR5VWgqeM0&callback=initMap&v=weekly"
      defer
    ></script>
  `;

  const clearMap = function() {
    $('#map').empty();
  };

  // mapPromise removes the #map element and prepends a
  // new #map div to the main tag
  const mapPromise = new Promise((resolve, reject) => {
    clearMap();
    $('main').prepend(mapHtml);
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

    // Marker image
    const image = {
      url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32),
    };

    // Image clickable region
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly",
    };
    let markerList = [];
    // Make points in map
    for (let elem of points) {
      markerList.push(new google.maps.Marker({
        position: {
          lat : elem.point_lng,
          lng : elem.point_lat
        },
        icon: image,
        map: map,
        title: elem.title,
        shape: shape,

      }));
    }
    for (let elem of markerList) {
      elem.addListener("click", () => {
        map.setZoom(8);
        map.setCenter(elem.getPosition());
      });
    }
    console.log(markerList);
  };

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

  // Testing id for map
  const testID1 = 1;

  // display Map takes in a single number(mapID)
  // and prepend a google maps element to the $main tag
  // where the map displayed has id mapID
  const displayMap = (mapID) => {
    mapPromise
      .then(() => {
        return Promise.all([
          getMapbyID(testID1),
          getPointsbyMapID(testID1)
        ]);
      }).then(results => {
        // console.log('all result', results);
        let lat, lng, zoom;
        ({lat, lng, zoom} = results[0].maps[0]);
        let points = results[1].points;
        // console.log(lat,lng,zoom);
        // let points = [];
        // console.log('points', points);
        initMap(lng, lat, zoom, points);
      });
  };

  // testing run
  displayMap(testID1);
  // getPointsbyMapID(testID1)
  //   .then((json) => {
  //     for (let elem of json.points) {
  //       console.log(elem.title, elem.point_lat, elem.point_lng);
  //     }
  //   });

  // Promise.all([
  //   getMapbyID(testID1),
  //   getPointsbyMapID(testID1)
  // ]).then(result =>{
  //   console.log('just',result);
  // });

});


//add marker
//UI events: click
//  const elevationService = google.maps.ElevationService();
// const locations = [{lat: 27.986065, lng:86.922623}];
// const promise = elevationService.getElevationForLocation({locations});

// promise
//     .then((response) => {
//       console.log(response.results);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//     .finally(() => {
//       console.log('done');
//     }); */

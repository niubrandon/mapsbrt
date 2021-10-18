
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
    const map = new google.maps.Map(
      document.getElementById("map"),
      {
        center: {lat,lng},
        zoom: zoom,
      });
    let pointsArr = [];
    for (let elem of points) {
      pointsArr.push(
        new google.maps.Marker({
          position: {
            lat : elem.point_lat,
            lng : elem.point_lng
          },
          map: map,
        })
      );
    }
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
      .then(() => getMapbyID(mapID))
      .then((json) => {
        // console.log(json.maps[0]);
        let lat, lng, zoom;
        ({lat, lng, zoom} = json.maps[0]);
        // console.log(lat,lng,zoom);
        initMap(lng, lat, zoom);
      });
  };

  // testing run
  displayMap(testID1);
  getPointsbyMapID(testID1)
    .then((json) => {
      console.log(json.points);
    });
});


//add marker
//UI events: click


/* const elevationService = google.maps.ElevationService();
const locations = [{lat: 27.986065, lng:86.922623}];

const promise = elevationService.getElevationForLocation({locations});

promise
    .then((response) => {
      console.log(response.results);
    })
    .catch((error) => {
      console.log(error);
    });
    .finally(() => {
      console.log('done');
    }); */


//add a marker on the map
/*
    function initMap() {
      const myLatLng = { lat: -25.363, lng: 131.044 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatLng,
      });

      new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
      });
    } */


/*  marker.setMap(null); */


// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
/* function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: -33.9, lng: 151.2 },
  });

  setMarkers(map);
}
 */
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
/* const beaches = [
  ["Bondi Beach", -33.890542, 151.274856, 4],
  ["Coogee Beach", -33.923036, 151.259052, 5],
  ["Cronulla Beach", -34.028249, 151.157507, 3],
  ["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
  ["Maroubra Beach", -33.950198, 151.259302, 1],
];
 */
/* function setMarkers(map) {
  // Adds markers to the map.
  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.
  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  const image = {
    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly",
  };

  for (let i = 0; i < beaches.length; i++) {
    const beach = beaches[i];

    new google.maps.Marker({
      position: { lat: beach[1], lng: beach[2] },
      map,
      icon: image,
      shape: shape,
      title: beach[0],
      zIndex: beach[3],
    });
  }
} */

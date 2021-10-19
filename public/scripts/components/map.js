
$(() => {
  // const $themap = (`
  // <div id="map"></div>
  //   <script
  //     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8o57_awNF0j94rrWH3t0DUIR5VWgqeM0&callback=initMap&v=weekly"
  //     defer
  //   ></script>
  // `);
  // Testing id for map
  const testID1 = 1;
  // display Map takes in a single number(mapID)
  // and prepend a google maps element to the $main tag
  // where the map displayed has id mapID
  // const displayMap = (mapID) => {
  //   mapPromise
  //     .then(() => {
  //       return Promise.all([
  //         getMapbyID(testID1),
  //         getPointsbyMapID(testID1)
  //       ]);
  //     }).then(results => {
  //       // console.log('all result', results);
  //       let lat, lng, zoom;
  //       ({lat, lng, zoom} = results[0].maps[0]);
  //       let points = results[1].points;
  //       // console.log(lat,lng,zoom);
  //       // let points = [];
  //       // console.log('points', points);
  //       initMap(lat, lng, zoom, points);
  //     });
  // };

  // testing run
  displayMap(testID1);

});


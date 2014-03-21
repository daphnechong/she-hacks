  // Define the LatLng coordinates for the polygon's path. Note that there's
  // no need to specify the final coordinates to complete the polygon, because
  // The Google Maps JavaScript API will automatically draw the closing side.

var poly;
var map;
var socket;

function initialize(s) {
  socket = s;
  var mapOptions = {
    zoom: 13,
    // Center the map on Sydeny, AUS.
    center: new google.maps.LatLng(-33.859867644619435, 151.21410369873047)
  };

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  var polyOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  };
  poly = new google.maps.Polygon(polyOptions);
  poly.setMap(map);

  // Add a listener for the click event
  google.maps.event.addListener(map, 'click', addLatLng);
}

var path;
var stopDrawing;
/**
 * Handles click events on a map, and adds a new point to the Polygon.
 * @param {google.maps.MouseEvent} event
 */
function addLatLng(event) {
  if (stopDrawing) {
      return;
  }

  createMarker(event.latLng)
}

function createMarker(data) {
  path = poly.getPath();

  latLng = new google.maps.LatLng(data.k, data.A);
  // // Because path is an MVCArray, we can simply append a new coordinate
  // // and it will automatically appear.
  path.push(latLng);

  // Add a new marker at the new plotted point on the polygon.
  var marker = new google.maps.Marker({
    position: latLng,
    title: '#' + path.getLength(),
    map: map
  });

  if (!data.isUpdateMessage) {
    latLng.isUpdateMessage = true;
    socket.emit('drawPolygon', latLng);
  }
}

//google.maps.event.addDomListener(window, 'load', initialize);

/**
 * Converts all the coordinates from path to a JSON String.
 */
function showPathAsJson() {
    if (!path) return;
    var listOfCoordinates = new Array();

    for (var i = 0; i < path.length; i++) {
        var c = path.getAt(i);
        listOfCoordinates.push({'lat': c.k, 'lon': c.A});
    }

    var asString = JSON.stringify(listOfCoordinates);
    console.log('coordinates as JSON', asString);
}


/**
 * Converts a JSON string to a list of coordinates and then adds them to a map
 */
function showExistingPath() {
    // this json object will be retrieved from the server
    var json = '[{"lat":-33.82450840458617,"lon":151.1916160583496},{"lat":-33.86571191586799,"lon":151.17616653442383},{"lat":-33.88110466676627,"lon":151.22629165649414},{"lat":-33.82964210524469,"lon":151.23985290527344}]' 
    var listOfCoordinates = JSON.parse(json);
    for (var i = 0; i < listOfCoordinates.length; i++) {
        var latLng = new google.maps.LatLng(listOfCoordinates[i].lat, listOfCoordinates[i].lon);
        addLatLng({"latLng" : latLng});
    }
}

function stop() {
    stopDrawing = true;
}

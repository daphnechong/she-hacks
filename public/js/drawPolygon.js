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
    // Center the map on Sydney, AUS.
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

function stop(isAdmin) {
    stopDrawing = true;

    if (isAdmin) socket.emit('stopPolygon');
}

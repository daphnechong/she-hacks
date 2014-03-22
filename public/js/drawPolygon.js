  // Define the LatLng coordinates for the polygon's path. Note that there's
  // no need to specify the final coordinates to complete the polygon, because
  // The Google Maps JavaScript API will automatically draw the closing side.

var poly;
var map;
var socket;
var path;
var stopDrawing = false;

function initialize(s) {
  socket = s;
  var mapOptions = {
    zoom: 13,
    // Center the map on Sydney, AUS.
    center: new google.maps.LatLng(-33.859867644619435, 151.21410369873047)
  };

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  setStyles(map);

  var polyOptions = {
    strokeColor: '#ee8339',
    strokeOpacity: 0.9,
    strokeWeight: 3
  };

  poly = new google.maps.Polygon(polyOptions);
  poly.setMap(map);

  setupListeners();

}

/**
 * Handles click events on a map, and adds a new point to the Polygon.
 * @param {google.maps.MouseEvent} event
 */
function addLatLng(event) {
  if (stopDrawing) {
      return;
  }

  createPolygonMarker(event.latLng)
}

function createPolygonMarker(data) {
  path = poly.getPath();

  latLng = new google.maps.LatLng(data.k, data.A);
  // // Because path is an MVCArray, we can simply append a new coordinate
  // // and it will automatically appear.
  path.push(latLng);

  if (!data.isUpdateMessage) {
    latLng.isUpdateMessage = true;
    socket.emit('drawPolygon', latLng);
  }
}

function stop(isAdmin) {
    stopDrawing = true;

    if (isAdmin) socket.emit('stopPolygon');
}

function setStyles() {
    map.set('styles', [

        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                { visibility: 'off' }
            ]
        }, {
            featureType: 'poi.attraction',
            elementType: 'geometry',
            stylers: [
                { visibility: 'off' }
            ]
        }

    ]);
}


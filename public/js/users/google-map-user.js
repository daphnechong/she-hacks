
var setupListeners = function() {

};

var forms = [];

function createMusterMarker(data) {
  if (stopDrawing) {

  	latLng = new google.maps.LatLng(data.location.k, data.location.A); // <-- this line
    var muster = new google.maps.Marker({
      position: latLng, // <-- this line
      map: map
    });

    muster.setIcon('img/muster-not-full.png')

    form = new google.maps.InfoWindow({
        content: data.name + ' ' + data.organiser + ' ' + data.phone + ' ' + data.description  + ' ' +data.numvolunteers
    });

    forms[data.location] = form;

    form.open(map,muster);

    google.maps.event.addListener(muster, 'click', function() {
    	forms[data.location].open(map, muster);
    });
  }
}

var setupListeners = function() {

};

var points = [];
var data = [];
var forms = [];

function createMusterMarker(data) {
  if (stopDrawing) {

  	latLng = new google.maps.LatLng(data.location.k, data.location.A); // <-- this line
    var muster = new google.maps.Marker({
      position: latLng, // <-- this line
      map: map
    });

    form = new google.maps.InfoWindow({
        content: data.name + ' ' + data.organiser + ' ' + data.phone + ' ' + data.description  + ' ' +data.numvolunteers
    });

    forms[data.location] = form;
    points[data.location] = muster;

    form.open(map,muster);

    google.maps.event.addListener(muster, 'click', function() {
    	forms[data.location].open(map, muster);

    	socket.emit('registerVolunteer', { location: data.location, name: 'alice', phone: '12121', numvolunteers: 2})
    });
  }
}

function registerVolunteer(data) {

    var form = forms[data.location];

    var content = ' new update! ' + data.currentSignup + form.content;

	form.content = content;
	form.open(map, points[data.location]);
}
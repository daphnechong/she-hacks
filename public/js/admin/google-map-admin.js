
var contentString = '<div id="content" >'+
    '<h4 id="firstHeading" class="firstHeading">Add a muster point</h4>'+
    '<div id="bodyContent">'+
        '<form role="form">' +
            '<div class="form-group">' +
                '<input type="text" class="form-control" id="event-name" placeholder="Enter event name">' +
            '</div>' +
            '<div class="form-group">' +
                '<input type="text" class="form-control" id="organiser" placeholder="Organiser name">' +
            '</div>' +
            '<div class="form-group">' +

                '<input type="text" class="form-control" id="phone-num" placeholder="Phone number">' +
            '</div>' +
            '<div class="form-group">' +
                '<textarea class="form-control" id="event-desc" rows="3" placeholder="Event description"></textarea>' +
            '</div>' +
            '<div class="form-group">' +

                '<input type="text" class="form-control" id="num-volunteers" placeholder="Number of volunteers">' +
            '</div>' +
            '<div class="btn btn-default" id="save-event" onclick="saveMusterPoint();">Create</div>' +
        '</form>' +
    '</div>'+
    '</div>';

var adminForm;
var musterLocation;

var setupListeners = function() {
      // Add a listener for the click event
    google.maps.event.addListener(map, 'click', addLatLng);

    //Add a listener for the click event
    google.maps.event.addListener(map, 'click', function(event) {
      createMusterMarker(event.latLng);
    });
}

function createMusterMarker(location) {

  if (stopDrawing) {
      var muster = new google.maps.Marker({
      position: location,
      map: map
    });
    muster.setIcon('img/muster-not-full.png')

    adminForm = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(muster, 'click', function() {
        console.log('muster', muster);
        adminForm.open(map,muster);
    });

    adminForm.open(map, muster);
    musterLocation = location;

  }

}

function saveMusterPoint() {

    var eventName = document.getElementById('event-name').value;
    var organiser = document.getElementById('organiser').value;
    var phoneNumber = document.getElementById('phone-num').value;
    var eventDesc = document.getElementById('event-desc').value;
    var numVolunteers = document.getElementById('num-volunteers').value;


    console.log("event name is: "+eventName);
    socket.emit('addPoint',
        {   location: musterLocation,
            name: eventName,
            organiser: organiser,
            phone: phoneNumber,
            description: eventDesc,
            numvolunteers: numVolunteers
    });
    musterLocation = '';
    adminForm.close();
}

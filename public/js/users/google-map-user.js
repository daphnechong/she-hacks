
var setupListeners = function() {

};

var points = [];
var data = [];
var forms = [];
var musterLocation;
var volunteerForms = [];

function createMusterMarker(data) {

    var contentString = '<div id="content" >'+
    '<h4 id="firstHeading" class="firstHeading">Disaster Volunteering</h4>'+
    '<div id="bodyContent">'+
        '<form role="form">' +
            '<h5 id="firstHeading" class="firstHeading">Event Name</h5>'+
            '<div>' +
                '<p>' + data.name + '</p>'+
            '</div>' +
            '<h5 id="firstHeading" class="firstHeading">Description</h5>'+
            '<div>' +
                '<p>' + data.description + '</p>'+
            '</div>' +
            '<div class="form-group">' +
                '<input type="text" class="form-control" id="volunteer-name" placeholder="Volunteer name">' +
            '</div>' +
            '<div class="form-group">' +
                '<input type="text" class="form-control" id="volunteer-phone-num" placeholder="Phone number">' +
            '</div>' +
            '<div class="form-group">' +
                '<input type="text" class="form-control" id="num-volunteers-friends" placeholder="Number of friends">' +
            '</div>' +
            '<div class="btn btn-default" onclick="registerVolunteer();">Attend event</div>' +
        '</form>' +
    '</div>'+
    '</div>';
  if (stopDrawing) {

  	latLng = new google.maps.LatLng(data.location.k, data.location.A); // <-- this line
    var muster = new google.maps.Marker({
      position: latLng, // <-- this line
      map: map
    });

    muster.setIcon('img/muster-not-full.png')

    form = new google.maps.InfoWindow({
        //content: data.name + ' ' + data.organiser + ' ' + data.phone + ' ' + data.description  + ' ' +data.numvolunteers
        content: contentString
    });

    forms[data.location] = form;
    points[data.location] = muster;

    musterLocation = data.location;
    // form.open(map,muster);

    google.maps.event.addListener(muster, 'click', function() {
    	forms[data.location].open(map, muster);
    });
  }
}

function registerVolunteer() {

    var form = forms[musterLocation];

    // var volName = document.getElementById('volunteer-name').value;
    // var volPhone = document.getElementById('volunteer-phone-num').value;
    // var volNumFriends = document.getElementById('num-volunteers-friends').value;

    var data = { location: musterLocation, name: "Daphne", phone: "00000000", numvolunteers: "2"};
    socket.emit('registerVolunteer', data);
    console.log("muster location: "+ musterLocation);
    
    form.close();
    musterLocation = '';

    

 //    var content = ' new update! ' + data.currentSignup + form.content;
}

function updateVolunteerSignup(data) {

}
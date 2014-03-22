
var setupListeners = function() {

};


function createMusterMarker(data) {
  if (stopDrawing) {
      var muster = new google.maps.Marker({
      position: data.location,
      map: map
    });

    adminForm = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(muster, 'click', function() {
    // 	{   location: musterLocation, 
    //         name: 'Clean up oil spill', 
    //         organiser: 'Bob', 
    //         phone: '12344509', 
    //         description: 'help us clean animals that have oil', 
    //         numvolunteers: '50'
    // }

        console.log('muster', data.name, data.organiser, data.phone, data.description, data.numvolunteers);
    });
  }
}
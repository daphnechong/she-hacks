function initialize() {
    var sydneyLatlng = new google.maps.LatLng(-33.864993,151.195801);

    var map_canvas = document.getElementById('map_canvas');
    var map_options = {
        center: sydneyLatlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(map_canvas, map_options);


    var contentString = '<div id="content">'+
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
                '<button type="submit" class="btn btn-default">Create</button>' +
            '</form>' +
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: sydneyLatlng,
        map: map,
        title: 'Add a muster point'
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
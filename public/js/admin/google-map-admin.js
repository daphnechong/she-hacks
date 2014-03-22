
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

var adminForm = new google.maps.InfoWindow({
    content: contentString
});

var marker = new google.maps.Marker({
    position: sydneyLatlng,
    map: map,
    title: 'Add a muster point'
});
google.maps.event.addListener(marker, 'click', function() {
    adminForm.open(map,marker);
});
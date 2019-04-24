document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([52.2301, 21.0072], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGF3ZWVsbDU4MDgiLCJhIjoiY2p1dWJsZDI1MGZzaDRkb2FhbG4xYjA2ZCJ9.DhqMMt8lD9ykZHiQ_jBkVw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
    }).addTo(map);

    function onMapClick(e) {
        marker = new L.marker(e.latlng, { draggable: 'true' });
        marker.on('dragend', function(event) {
            var marker = event.target;
            var position = marker.getLatLng();
            marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: 'true' });
            map.panTo(new L.LatLng(position.lat, position.lng))
            document.getElementById("table").innerHTML = "<tr>" + "<td>" + position.lat + "</td>" + "<td>" + position.lng + "</td>" + "</tr>";
        });
        map.addLayer(marker);
        var coord = e.latlng.toString().split(',');
        var lat = coord[0].split('(');
        var lng = coord[1].split(')');
        document.getElementById("table").innerHTML += "<tr>" + "<td>" + lat[1] + "</td>" + "<td>" + lng[0] + "</td>" + "</tr>";
    };

    map.on('click', onMapClick);
});
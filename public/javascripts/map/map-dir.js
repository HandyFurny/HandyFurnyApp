
function startMap(user) {
        var map = new google.maps.Map(document.getElementById('map-dir'), {
          center: { 
            lat:user.location.coordinates[0],
            lng:user.location.coordinates[1]
            },
          zoom: 10
        });
        var infoWindow = new google.maps.InfoWindow({map: map});
        var myLatLng = {lat:user.location.coordinates[0], lng:user.location.coordinates[1]};
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'User direction!'
          });   
  };
  
  startMap(user);

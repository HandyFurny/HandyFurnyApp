function autocomplete(input, map){
    const dropdown = new google.maps.places.Autocomplete(input);  //places es una libreria extrat de google, hay que pedir la en el index: &libraries=places qu’on rajoute au src du script
    dropdown.addListener("place_changed", ()=>{
        const place = dropdown.getPlace();
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        map.setCenter(place.geometry.location);
        map.setZoom(15);
    });
  }




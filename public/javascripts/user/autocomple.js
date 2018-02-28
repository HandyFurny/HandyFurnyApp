
//geocode
var input = document.getElementById("search-box-user");
  
function autocomplete(input){
  const dropdown = new google.maps.places.Autocomplete(input);  //places es una libreria extrat de google, hay que pedir la en el index: &libraries=places qu’on rajoute au src du script
  dropdown.addListener("place_changed", ()=>{
    console.log(dropdown)
      const place = dropdown.getPlace();
      console.log(place);
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
      document.getElementById("search-box-user-lat").value = place.geometry.location.lat()
      document.getElementById("search-box-user-lng").value = place.geometry.location.lng()
  });
}

autocomplete(input);
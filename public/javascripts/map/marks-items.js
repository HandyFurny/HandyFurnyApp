function markItems(map){
        items.forEach(item => {
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<a href="/catalog/'+ item._id +'"><h3 id="firstHeading">' + item.title + '</h3>' +
            '<div id="bodyContent"></a>'+
            '<p><b>$'+ item.price +'.00</b></p>'+
            '<p>Seller: <a href="/user/'+ item._creator._id + '">'+ item._creator.username
            +'</a></p>'+
            '</div>'+
            '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
    
        var marker = new google.maps.Marker({
          position: {
              lat:item._creator.location.coordinates
              [0],
              lng:item._creator.location.coordinates
              [1]
              },
          map: map,
          title: 'item'
        });
        
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
    });
      }
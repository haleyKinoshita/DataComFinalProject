

$(document).ready(function() {

  $("#search").click(function() {
    // recieves the parameters from the website and sends them to the python server
    var searchReq = $.get("/sendRequest/" + $("#locality").val() + ","+ $("#region").val() + ","+ $("#postal_code").val());
        var map;
        searchReq.done(function(data) {
          var json = JSON.parse(data);
          var listLength = json['objects'].length;
          for (var i = 0; i < listLength; ++i) {
            var myLatLng = {lat: json['objects'][i].lat, lng: json['objects'][i].long};
            if (i == 0) {
              map = new google.maps.Map(document.getElementById('map'), {
                zoom: 11,
                center: myLatLng
              });
            };
            var marker = new google.maps.Marker({
                position: myLatLng,
                locality: json['objects'][i].locality,
                region: json['objects'][i].region,
                street_address: json['objects'][i].street_address,
                postal_code: json['objects'][i].postal_code,
                map: map,
                title: json['objects'][i].name
              });

            marker.addListener('click', function() {
              /* 
                  when the user clicks on a marker we will render the 
                  the yelp review for that business on the side
              */
              console.log(marker.title);
            });
          };
          
        });
        


  });

});

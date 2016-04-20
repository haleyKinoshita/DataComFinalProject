

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
                map: map,
                title: json['objects'][i].name
              });
            google.maps.event.addListener(marker,'click', function() {
                var title = this.title;
                var local = this.locality;
                var markerReq = $.get("/sendMarker/" + title + ","+ local);
                var businessId;
                
                markerReq.done(function(data) {
                  var json = JSON.parse(data);
                  console.log(json);
                  businessId = json['businesses'][0].id;
                  var s = document.createElement("script");
                  s.async = true;
                  s.onload = s.onreadystatechange = function(){
                    getYelpWidget(businessId,"300","BLK","y","y","3");
                  };
                  s.src='http://chrisawren.com/widgets/yelp/yelpv2.js' ;
                  var x = document.getElementsByTagName('script')[0];
                  x.parentNode.insertBefore(s, x);
                  
                });
                
                

            });
          };
        });
  });
});

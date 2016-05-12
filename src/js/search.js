    // list of store data, name, lat, long
    var locations = [
      ['Andrisen Morton', 39.720622, -104.950710, "270 Saint Paul Street, Denver, CO 80206", "http://www.andrisenmorton.com/", "303.377.8488"],
      ['Armitage & McMillan', 39.757202, -105.008315, "1550 Platte Street, Suite D, Denver, CO 80202", "http://armitageandmcmillan.com/", "303.284.6222"],
      ['Axel\'s', 39.640907, -106.374441, "201 Gore Creek Drive, Vail, CO 81657", "http://axelsltd.com/", "970.497.4888"],
      ['Berkeley Supply', 39.774877, -105.044190, "4309 Tennyson Street, Denver, CO 80212", "http://berkeleysupply.com/", "720.445.6818"],
      ["Blackland Clothing Company", 40.521796, -105.060545, "925 E Harmony Road, Fort Collins, CO 80525", "http://www.blacklandclothing.com/", "720.445.6818"],
      ['Family Affair', 39.753788, -104.991790, "2049 Larimer Street, Denver, CO 80205", "http://www.familyaffairdenver.com/", "303.593.0289"],
      ['The Garment District', 39.669606, -104.941051, "2595 S. Colorado Blvd, Denver, CO 80222", "http://www.garmentdistrictcolorado.com/", "303.757.3371"],
      ['Jiberish', 39.757510, -105.007335, "1620 Platte Street Unit F, Denver, CO 80202", "https://www.jiberish.com/", "lohi@jiberish.com"],
      ['Lawrence Covell', 39.720082, -104.950170, "225 Steele Street, Denver CO 80206", "http://www.lawrencecovell.com/", "303.320.1023"],
      ['Nod And Rose', 40.018872, -105.279926, "11220 Spruce Street, Boulder, Colorado 80302", "http://www.nodandrose.com/", "303.442.2322"],
      ['Players Clothing', 39.750620, -105.001291, "1501 Wazee Street, Denver, Colorado 80202", "http://www.playersclothing.com/", "303.752.9377"],
      ['Soul Haus', 39.743384, -104.971299, "1225 East 17th Avenue, Denver, CO 80218", "http://www.soulhaus.com/", "303.830.7685"],
      ['Station', 39.755390, -104.977441, "2735 Welton Street, Denver, CO 80205", "http://www.stationdenver.com/", "303.819.6354"],
      ['Steadbrook', 39.715683, -104.987232, "46 South Broadway, Denver, CO 80209", "http://steadbrook.com/", "720.441.1891"],
      ['Sully & Co', 39.753281, -105.023863, "2443 Eliot Street, Denver, Colorado 80211", "http://sullyandco.com/", "720.398.8064"],
      ['Topo Designs Boulder', 40.017401, -105.283126, "935 Pearl Street, Boulder, CO 80302", "http://topodesigns.com/", "720.255.2932"],
      ['Topo Designs Denver Flagship', 39.757709, -104.986164, "2500 Larimer Street, #102 Denver, CO 80205", "http://topodesigns.com/", "303.954.8420"],
      ['Topo Designs Fort Collins', 40.586244, -105.076525, "130B S. College Avenue, Fort Collins, CO 80524", "http://topodesigns.com/", "970.568.8628"],
      ['Weekends Boulder', 40.017774, -105.279765, "1200 Pearl Street, Boulder, CO 80302", "http://weekendsboulder.com/#welcome", "303.444.4231"],
      ['Winter Session', 39.757352, -104.974607, "2952 Welton Street, Denver, CO 80205", "http://www.winter-session.com/", "hello@winter-session.com"]
    ];

    // creating markers empty array
    var markers = [];
    //declaring marker variable
    var marker;

  function appendPins(pins){

    var infowindow = new google.maps.InfoWindow({
        content: 'test'
    });

    for (var i = 0; i < pins.length; i++) {
          var latitude = pins[i][1];
          var longitude = pins[i][2];
          var name = pins[i][0];
          var address = pins[i][4]
          var contentString = '<div id="content"><h1>'+ name + '</h1><h4>'+address+'</h4></div>';


          var marker = new google.maps.Marker({
            position: {lat: latitude, lng:longitude},
            map: map,
            windowContent: contentString,
            name: name
          });

          markers.push(marker);
          //Add event listener for pin clicks
          google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(this.windowContent);
                infowindow.open(map, this);

            });
    }

  }

$('#search').on('click', function(el){
  initMap(map);
});

// declaring a function of initmap, that takes a map
function initMap(map) {

  // finding the user location function
  navigator.geolocation.getCurrentPosition(function(position) {
    // setting location of the user to the center
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    // making map center
    map.setCenter(pos);

    appendPins(locations);

    // drawing circle
    search_area = {
      // circle color
      strokeColor: '#FF0000',
      // opacity of circle
      strokeOpacity: 0.8,
      // how big the stroke is
      strokeWeight: 2,
      // center is the  pos
      center : new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      radius : 2200
    };

    // search area is now the size of the circle
    search_area = new google.maps.Circle(search_area);
    // setting area in map
    search_area.setMap(map);

    // finding markers inside circle
    var bounds = search_area.getBounds();

    // searching to each if any of the markers are in the area
    var markersWithinBounds = markers.filter(function(marker){
      return bounds.contains(marker.getPosition());
    });

    console.log(markersWithinBounds);
    // calling a function with the pins in the area
    closestStores(markersWithinBounds);


  });

}

// making a function called closest stores that takes an array
function closestStores(arr){
 // searching through an array
  for(i=0;i<arr.length;i++){
    console.log(arr[i]);
    // appends the array title to closeStores ul id.
    $('#closeStores').append('<li>'+arr[i].name+'</li>');
  }
}
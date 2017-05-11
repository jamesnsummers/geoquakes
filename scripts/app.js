// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;

$(document).ready(function() {
  console.log("Let's get coding!");

  function getQuakes() {
    $.ajax({
      method: "GET",
      url: weekly_quakes_endpoint,
      data: $("form").serialize(),
      success: onSuccess,
      error: onError
    });
  }



  function onSuccess(json) {
    for (var i = 0; i < json.features.length; i++) {
      var thePresent = new Date();
      var quakeTime = json.features[i].properties.time;
      var timeSince = Math.floor((thePresent-quakeTime)/(60*60*1000));
      if (timeSince === 1) {
        var timeHolder = ' hour ago.'
      } else if (timeSince === 0){
        timeHolder = 'Happening now!'
      } else {
        timeHolder = ' hours ago.'
      }
      $('#info').append('When it happened: '+ timeSince + timeHolder);
      $('#info').append(`<p>`+json.features[i].properties.title+`</p>`);
      var allQuakes = {lat: json.features[i].geometry.coordinates[1], lng:json.features[i].geometry.coordinates[0]};
        var pin = new google.maps.Marker({
        position: allQuakes,
        map: map,
        icon: 'images/earthquake.png'
        });
    }
  }

  function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  }

  function initMap() {
    var latLng = {lat: 30.2682, lng: -97.74295};
    map = new google.maps.Map($('#map')[0], {
      zoom: 4,
      center: latLng
    });

  }

  getQuakes();
  initMap();

});

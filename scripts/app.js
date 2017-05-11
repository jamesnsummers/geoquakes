// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

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

  var thePresent = Date.now();

  function onSuccess(json) {
    for (var i = 0; i < json.features.length; i++) {
      $('#info').append(json.features[i].properties.title);
    }

  }

  function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  }

  getQuakes();

});


// console.log(json.features[0].properties.url);
// console.log(json.features[0].properties.title);
// console.log(json.features[0].geometry.coordinates);
// console.log(json.features[0].properties.time);
// console.log(Date.now());
// console.log(Date.now() - json.features[0].properties.time);

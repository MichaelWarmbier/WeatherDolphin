/////* Data */////

activeLat = 51.505;
activeLong = -0.09;

var receivedData = null;
var storedData = [
{
  date: null,
  celsius: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  fahrenheit: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  weather: null
},
{
  date: null,
  celsius: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  fahrenheit: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  weather: null
},
{
  date: null,
  celsius: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  fahrenheit: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  weather: null
},
{
  date: null,
  celsius: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  fahrenheit: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  weather: null
},
{
  date: null,
  celsius: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  fahrenheit: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  weather: null
},
{
  date: null,
  celsius: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  fahrenheit: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  weather: null
},
{
  date: null,
  celsius: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  fahrenheit: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  weather: null
},
{
  date: null,
  celsius: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  fahrenheit: {
    morn: null,
    day: null,
    eve: null,
    night: null,
  },
  weather: null
}]

/////* Functions */////

async function initialize(long, lat) { // Initializes data objects

  receivedData = await pullData('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=hourly,minutely&appid=270a656651f64bb2de710a5bba3df6c7&units=imperial');

  for (i = 0; i <= 7; i++) {
    storedData[i].date = await receivedData.daily[i].dt;
    let time = new Date(storedData[i].date * 1000);
    // Set Dates
    storedData[i].date = (time.getMonth() + '/' + time.getDate() + '/' + time.getFullYear())
    // Set Fahrenheit Info
    storedData[i].fahrenheit.morn = (receivedData.daily[i].temp.morn).toFixed(2);
    storedData[i].fahrenheit.day = (receivedData.daily[i].temp.day).toFixed(2);
    storedData[i].fahrenheit.eve = (receivedData.daily[i].temp.eve).toFixed(2);
    storedData[i].fahrenheit.night = (receivedData.daily[i].temp.night).toFixed(2);
    // Set Celsius Info
    storedData[i].celsius.morn = ((storedData[i].fahrenheit.morn - 32) * 5/9).toFixed(2);
    storedData[i].celsius.day = ((storedData[i].fahrenheit.day - 32) * 5/9).toFixed(2);
    storedData[i].celsius.eve = ((storedData[i].fahrenheit.eve - 32) * 5/9).toFixed(2);
    storedData[i].celsius.night = ((storedData[i].fahrenheit.night - 32) * 5/9).toFixed(2);
    // Set Weather Info
    storedData[i].weather = receivedData.daily[i].weather[0].main;

  }


  console.log('Longitude: ' + long + '\nLatitude: ' + lat + '\n')
  await console.log(storedData);
  console.log('\n\n');

}

async function pullData(link) { // Grabs data from API

  request = await fetch(link);
  d = request.json();
  return d;

}


/////* Leaflet.js */////

// Create Map
var Map = L.map('map').setView([51.505, -0.09], 13);

// Add tilelayer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2lyYm91dCIsImEiOiJja3Q2MnYybGwwZWR4Mndsamw3MDE0NGpzIn0.TQgwZ7wIV0MrFLWVGUC5FA'

}).addTo(Map);

// Store longitude and latitude on click event
function mapClick(e) {
  activeLat = e.latlng.lat;
  activeLong = e.latlng.lng;

  initialize(activeLong, activeLat);
}

Map.on('click', mapClick);

/////* Other */////

// Run initialize() on window load
window.onload = function() { return initialize(activeLong, activeLat); };



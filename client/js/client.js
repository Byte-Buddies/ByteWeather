import {getWeatherByCity, getWeatherByLatLon, getWeatherByZip} from "./weather.js";
import {displayWeather} from "./display.js";

const submitButton = document.getElementById('submit-btn');
const searchInput = document.getElementById('search');

document.addEventListener("DOMContentLoaded", () => {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, fail);
    } else {
        console.log("Geolocation is not supported or allowed");
    }
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  getWeatherByLatLon(lat, lon)
    .then(data => {
      if (data) {
        displayWeather(data);
      } else {
        console.error('Error fetching weather data.');
      }
    });
}

function fail(message) {
    const getLocationButton = document.querySelector('.location');
    getLocationButton.textContent = "Location Unavailable";
    console.log(message.code);
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // prevent the form from submitting normally
    const inputValue = searchInput.value.trim();

    if (isNumeric(inputValue)) {
        getWeatherByZip(inputValue)
          .then(data => {
              if (data) {
                  displayWeather(data);
              } else {
                  console.error('Error fetching weather data.');
              }
          });
    } else {
        getWeatherByCity(inputValue)
          .then(data => {
              if (data) {
                  displayWeather(data);
              } else {
                  console.error('Error fetching weather data.');
              }
          });
    }
});

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)
        !isNaN(parseFloat(str)) // ensure strings of whitespace fail
}
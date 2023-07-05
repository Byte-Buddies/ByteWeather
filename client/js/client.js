import { getWeatherByLatLon, getWeatherByCity, getWeatherByZip } from './api.js';
const submitButton = document.getElementById('submit-btn');
const searchInput = document.getElementById('search');

document.addEventListener("DOMContentLoaded", () => {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, fail);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByLatLon(lat, lon).then(r => displayWeather(r));
}

function fail(message) {
    const getLocationButton = document.getElementById('loc');
    getLocationButton.textContent = "Location Unavailable";
    console.log(message.code);
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // prevent the form from submitting normally
    const inputValue = searchInput.value.trim();

    if (isNumeric(inputValue)) {
        getWeatherByZip(inputValue).then(r => displayWeather(r));
    } else {
        getWeatherByCity(inputValue).then(r => displayWeather(r));
    }
});

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)
        !isNaN(parseFloat(str)) // ensure strings of whitespace fail
}
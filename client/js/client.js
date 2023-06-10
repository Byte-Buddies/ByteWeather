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
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ensure strings of whitespace fail
}

// the following functions are used to get the weather data from the server
// #1 get weather data by latitude and longitude
async function getWeatherByLatLon(lat, lon) {
    const response = await fetch('http://localhost:3000/getWeatherByLatLon?latitude=' + lat + '&longitude=' + lon);
    if(response.ok) {
        const data = await response.json();
        displayWeather(data);
    } else {
        console.error('Error:', response.status);
    }
}

// #2 get weather data by city name
async function getWeatherByCity(city) {
    const response = await fetch('http://localhost:3000/getWeatherByCity?city=' + city)
        .catch(error => console.error('Network Error:', error));
    if(response && response.ok) {
        const data = await response.json();
        displayWeather(data);
    } else {
        console.error('Error:', response.status);
    }
}

// #3 get weather data by zip code
async function getWeatherByZip(zip) {
    const response = await fetch('http://localhost:3000/getWeatherByZip?zip=' + zip)
        .catch(error => console.error('Network Error:', error));
    if(response && response.ok) {
        const data = await response.json();
        displayWeather(data);
    } else {
        console.error('Error:', response.status);
    }
}


// finally, display the weather data received from the server
function displayWeather(data) {
    const cloudPct = data.cloud_pct;
    const temperature = data.temp;
    const feelsLike = data.feels_like;
    const humidity = data.humidity;
    const minTemp = data.min_temp;
    const maxTemp = data.max_temp;
    const windSpeed = data.wind_speed;
    const windDegrees = data.wind_degrees;
    const sunrise = data.sunrise;
    const sunset = data.sunset;

    const weatherContainer = document.querySelector("#weather-container");
    weatherContainer.innerHTML = `
        <p>${cloudPct}</p>
        <p>${temperature}°F</p>
        <p>${feelsLike}°F</p>
        <p>${humidity}%</p>
        <p>${minTemp}°F</p>
        <p>${maxTemp}°F</p>
        <p>${windSpeed}</p>
        <p>${windDegrees}</p>
        <p>${sunrise}AM</p>
        <p>${sunset}PM</p>
    `;
}
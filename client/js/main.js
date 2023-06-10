import * as dotenv from 'dotenv'
dotenv.config();
const apiKey = process.env.API_KEY;

// calls getLocation when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) { // requests the users location
        navigator.geolocation.getCurrentPosition(showPosition); // if yes, use showPosition to get lat and lon
    } else {
        console.log("Geolocation is not supported by this browser."); // if no, it shows this message in the console
    }
}

function showPosition(position) { // takes the 'position' object as an argument
    const lat = position.coords.latitude; // extract lat from geoLocation
    const lon = position.coords.longitude; // extract lon from geoLocation
    getWeather(lat, lon); // calls getWeather using the lat and lon as parameters
}

async function getWeather(lat, lon) {
    // Call your server here instead of the OpenWeatherMap API directly
    const apiUrl = `/getWeather?lat=${lat}&lon=${lon}&units=imperial`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}


// this function extracts data that we want from the API response
function displayWeather(data) {
    const city = data.name;
    const weather = data.weather[0].description;
    const temperature = Math.round(data.main.temp);

    // the data is displayed in the HTML class weatherContainer
    const weatherContainer = document.querySelector("#weather-container");
    weatherContainer.innerHTML = `
    <h2>${city}</h2>
    <p>${weather}</p>
    <p>${temperature}°F</p>
  `;
}

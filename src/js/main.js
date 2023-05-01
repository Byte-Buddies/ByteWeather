import dotenv from 'dotenv'; // loads .env into process.env object
dotenv.config();
const apiKey = process.env.API_KEY; // reads the key using process.env and assigns it to apiKey (using apiKey instead of actual key)

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

function showPosition(position) { // function takes the geoLocation API 'position' object as an argument
    const lat = position.coords.latitude; // extract lat from geoLocation
    const lon = position.coords.longitude; // extract lon from geoLocation
    getWeather(lat, lon); // calls getWeather using the lat and lon as parameters
}

// this function calls the OpenWeatherMap API, lat, lon, and apiKey are inserted into the apiUrl using ${template literals}
async function getWeather(lat, lon) {
    const apiKey = "apiKey"; // OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    // the fetch function is using the apiUrl we just created to:
    // 1. authorize our API key
    // 2. get weather data based off lon and lat values
    // the response is converted into a json object and saved to 'data'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // we use the data object we created to display the weather
        // if an error occurs, this message will print to the console
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
    const rain = data.rain;

    // the data is displayed in the HTML class weatherContainer
    const weatherContainer = document.querySelector("#weather-container");
    weatherContainer.innerHTML = `
    <h2>${city}</h2>
    <p>${weather}</p>
    <p>${temperature}°F</p>
  `;
}

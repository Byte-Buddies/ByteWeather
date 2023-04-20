// im not sure that we need this
// when the DOM is fully loaded it will call getLocation
// it's just to make sure out page is fully loaded before it asks for a location request
document.addEventListener("DOMContentLoaded", () => {
    getLocation();
});

// in this function we are requesting the users location
// if the user denies or if their browser is not supported an error message will print to the console.
function getLocation() { // function is defined
    if (navigator.geolocation) { // checks if the browser supports the GeolocationAPI
        navigator.geolocation.getCurrentPosition(showPosition); // if yes, it gets the user location
    } else {
        console.log("Geolocation is not supported by this browser."); // if no, it shows this message in the console
    }
}

// when we get the location, we store lat and lon in two different variables.
// the location is returned from the API in the APIs 'position' object
// we extract the lat and lon using position.coords.
// we can then call getWeather() using the lat and lon variables we created
function showPosition(position) { // function is defined and takes the APIs position object as an argument
    const lat = position.coords.latitude; // "position" is an object in the GeolocationAPI
    const lon = position.coords.longitude; // latitude and longitude are properties of the position object
    getWeather(lat, lon); // function is defined below and gets the weather using the location coordinates
}

// this function calls the OpenWeatherMap API
// the key and url are stored in variables
// lat, lon, and key are inserted into the URL using ${template literals}
async function getWeather(lat, lon) {
    const apiKey = "dd9e07f2bfa8ccf8d60a8a83d41cad89"; // OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    // the fetch function is using the apiUrl we just created to:
    // 1. authorize us using API key
    // 2. get weather data based off lon and lat values
    // the response is converted into a json object and saved to 'data'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // we use the data variable we created to display the weather
        // if an error occurs, this message will print to the console
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// this function extracts the data that we want from the API
// this API provides lots of information we can extract using its objects and properties
// the list is endless so we can discuss adding more data here
function displayWeather(data) {
    const city = data.name;
    const weather = data.weather[0].description;
    // const weatherIcon = data.weather.icon;
    const temperature = Math.round(data.main.temp);
    const rain = data.rain;

    // to be consistent, I used a query selector to get the weather container
    // the information listed after weatherContainer.innerHTML = will be user facing
    const weatherContainer = document.querySelector("#weather-container");
    weatherContainer.innerHTML = `
    <h2>${city}</h2>
    <p>${weather}</p>
    <p>${temperature}°F</p>
  `;
}

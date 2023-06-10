// calls getLocation when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    getLocation();
});

function getLocation() {
    const getLocationButton = document.getElementById('loc'); //HTML Element
    if (navigator.geolocation) {
        getLocationButton.textContent = "Checking your location...";
        navigator.geolocation.getCurrentPosition(success, fail);
    } else {
        getLocationButton.textContent = "Unsupported browser";
        console.log("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
}

function fail(message) {
    const getLocationButton = document.getElementById('loc');
    getLocationButton.textContent = "Location Unavailable";
    console.log(message.code);
}

async function getWeather(lat, lon) {
    const apiUrl = `/getWeather?latitude=${lat}&longitude=${lon}&units=imperial`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeather(data) {
    const city = data.name;
    const weather = data.weather[0].description;
    const temperature = Math.round(data.main.temp);
    const weatherContainer = document.querySelector("#weather-container");
    weatherContainer.innerHTML = `
        <h2>${city}</h2>
        <p>${weather}</p>
        <p>${temperature}°F</p>
    `;
}

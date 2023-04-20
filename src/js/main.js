document.addEventListener("DOMContentLoaded", () => {
    getLocation();
});

function displayWeather(data) {
    const city = data.name;
    const country = data.sys.country;
    const weather = data.weather[0].description;
    const temperature = Math.round(data.main.temp);

    const weatherContainer = document.querySelector("#weather-container");
    weatherContainer.innerHTML = `
    <h2>${city}, ${country}</h2>
    <p>${weather}</p>
    <p>${temperature}°C</p>
  `;
}

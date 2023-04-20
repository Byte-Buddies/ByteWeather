async function getWeather(lat, lon) {
    const apiKey = "dd9e07f2bfa8ccf8d60a8a83d41cad89"; // OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

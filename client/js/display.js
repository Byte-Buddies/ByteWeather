import { celsiusToFahrenheit, unixToLocalTime, msToMph, degreesToDirection } from './helper.js';

// finally, display the weather data received from the server
function displayWeather(data) {

		// cloud cover percentage
		const cloudPercentage = data.cloud_pct;

		// current temperature
		const temperature = celsiusToFahrenheit(data.temp);

		// feels like temperature
		const feelsLike = celsiusToFahrenheit(data.feels_like);

		// humidity
		const humidity = data.humidity;

		// min and max temperature
		const minTemp = celsiusToFahrenheit(data.min_temp);
		const maxTemp = celsiusToFahrenheit(data.max_temp);

		// wind speed and direction
		const windSpeed = msToMph(wind_speed);
		const windDegrees = degreesToDirection(data.wind_degrees);

		// convert unix time to local time - sunrise
		const sunriseTime = unixToLocalTime(data.sunrise);

		// convert unix time to local time - sunset
		const sunsetTime = unixToLocalTime(data.sunset);

		const weatherContainer = document.querySelector("#weather-container");
		weatherContainer.innerHTML = `
        <p>Cloud Cover: ${cloudPercentage}%</p>
        <p>Temperature: ${temperature}°F</p>
        <p>Feels like: ${feelsLike}°F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Min Temperature: ${minTemp}°F</p>
        <p>Max Temperature: ${maxTemp}°F</p>
        <p>Wind Speed: ${windSpeed}</p>
        <p>Wind Degrees: ${windDegrees}</p>
        <p>Sunrise: ${sunriseTime}AM</p>
        <p>Sunset: ${sunsetTime}PM</p>
    `;
}

export { displayWeather };
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
		const windSpeed = msToMph(data.wind_speed);
		const windDirection = degreesToDirection(data.wind_degrees);

		// convert unix time to local time - sunrise
		const sunriseTime = unixToLocalTime(data.sunrise);

		// convert unix time to local time - sunset
		const sunsetTime = unixToLocalTime(data.sunset);

		const weatherContainer = document.querySelector("#weather-container");
		weatherContainer.innerHTML = `
        
        <section class="card">
        <p>Current Temp: ${temperature}°F</p>
        <p>Feels like: ${feelsLike}°F</p>
        </section>
        <div class="min-max-temp">
										<aside class="card">
										<i class="fa-solid fa-sun"></i>
										<p>Sunrise: ${sunriseTime}</p>
										<p>Max Temp: ${maxTemp}°F</p>
										</aside>
										<aside class="card">
										<i class="fa-solid fa-moon"></i>
										<p>Sunset: ${sunsetTime}</p>
										<p>Min Temp: ${minTemp}°F</p>
										</aside>
        </div>
        <section class="card">
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} MPH</p>
        <p>Wind Direction: ${windDirection}</p>
        <p>Cloud Cover: ${cloudPercentage}%</p>
        </section>
    `;
}

export { displayWeather };
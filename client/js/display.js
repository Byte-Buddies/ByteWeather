import { celsiusToFahrenheit, unixToLocalTime, msToMph, degreesToDirection } from './helper.js';

// display the weather data received from the server
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

		const weatherDataPoints = [
				{icon: 'fa-temperature-half', label: 'Current Temp', value: `${temperature}°F`},
				{icon: 'fa-fingerprint', label: 'Feels like', value: `${feelsLike}°F`},
				{icon: 'fa-temperature-arrow-up', label: 'Max Temp', value: `${maxTemp}°F`},
				{icon: 'fa-sun', label: 'Sunrise', value: `${sunriseTime}`},
				{icon: 'fa-moon', label: 'Sunset', value: `${sunsetTime}`},
				{icon: 'fa-temperature-arrow-down', label: 'Min Temp', value: `${minTemp}°F`},
				{icon: 'fa-droplet', label: 'Humidity', value: `${humidity}%`},
				{icon: 'fa-wind', label: 'Wind Speed', value: `${windSpeed} MPH<br>${windDirection}`},
				{icon: 'fa-cloud', label: 'Cloud Cover', value: `${cloudPercentage}%`}
		];

		let html = '';

		for (let dataPoint of weatherDataPoints) {
				html += `
    <div class="flip-container">
      <section class="flip">
        <div class="front">
          <p><i class="fa-solid ${dataPoint.icon} fa-2xl"></i><br>${dataPoint.label}</p>
        </div>
        <div class="back">
          <p>${dataPoint.value}</p>
        </div>
      </section>
    </div>
  `;
		}

		weatherContainer.innerHTML = html;

}

export { displayWeather };
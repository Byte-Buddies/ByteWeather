import { celsiusToFahrenheit, unixToLocalTime, msToMph, degreesToDirection } from './helper.js';

// display the weather data received from the server
function displayWeather(data) {

		if (!data) {
				console.error('Error: no weather data found');
				return;
		}

		const temperature = celsiusToFahrenheit(data.temp);
		const feelsLike = celsiusToFahrenheit(data.feels_like);
		const minTemp = celsiusToFahrenheit(data.min_temp);
		const maxTemp = celsiusToFahrenheit(data.max_temp);
		const windSpeed = msToMph(data.wind_speed);
		const windDirection = degreesToDirection(data.wind_degrees);
		const sunriseTime = unixToLocalTime(data.sunrise); // convert unix time to local time - sunrise
		const sunsetTime = unixToLocalTime(data.sunset); // convert unix time to local time - sunset

		// display location data
		const locationContainer = document.querySelector(".location");
		locationContainer.textContent = data.location;

		// display weather data
		const weatherContainer = document.querySelector("#weather-container");
		const weatherDataPoints = [
				{icon: 'fa-temperature-half', label: 'Current Temp', value: `${temperature}°F`},
				{icon: 'fa-fingerprint', label: 'Feels like', value: `${feelsLike}°F`},
				{icon: 'fa-temperature-arrow-up', label: 'Max Temp', value: `${maxTemp}°F`},
				{icon: 'fa-sun', label: 'Sunrise', value: `${sunriseTime}`},
				{icon: 'fa-moon', label: 'Sunset', value: `${sunsetTime}`},
				{icon: 'fa-temperature-arrow-down', label: 'Min Temp', value: `${minTemp}°F`},
				{icon: 'fa-droplet', label: 'Humidity', value: `${data.humidity}%`},
				{icon: 'fa-wind', label: 'Wind Speed', value: `${windSpeed} MPH<br>${windDirection}`},
				{icon: 'fa-cloud', label: 'Cloud Cover', value: `${data.cloud_pct}%`}
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
import { displayWeather } from './display.js';

// Generic function to fetch weather data
async function fetchWeatherData(params) {
		const apiUrl = `https://api.api-ninjas.com/v1/weather?${params}`;

		const response = await fetch(apiUrl, {
				headers: {
						'X-Api-Key': API_KEY
				},
		});

		if (response.ok) {
				const data = await response.json();
				displayWeather(data);
		} else {
				console.error('Error:', response.status);
		}
}

// Get weather data by latitude and longitude
async function getWeatherByLatLon(lat, lon) {
		const params = `lat=${lat}&lon=${lon}`;
		await fetchWeatherData(params);
}

// Get weather data by city name
async function getWeatherByCity(city) {
		const params = `city=${city}`;
		await fetchWeatherData(params);
}

// Get weather data by zip code
async function getWeatherByZip(zip) {
		const params = `zip=${zip}`;
		await fetchWeatherData(params);
}


export { getWeatherByLatLon, getWeatherByCity, getWeatherByZip };
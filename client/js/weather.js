async function fetchWeatherData(params) {
		try {
				const response = await fetch(`http://localhost:2000/weather?${params}`);
				if (response.ok) {
						return await response.json();
				} else {
						console.error('Error: unable to connect', response.status);
						return null;
				}
		} catch (err) {
				console.error('Error:', err);
				return null;
		}
}

// Get weather data by latitude and longitude
		async function getWeatherByLatLon(lat, lon) {
				const params = `lat=${lat}&lon=${lon}`;
				return await fetchWeatherData(params);
		}

// Get weather data by city name
		async function getWeatherByCity(city) {
				const params = `city=${city}`;
				return await fetchWeatherData(params);
		}

// Get weather data by zip code
		async function getWeatherByZip(zip) {
				const params = `zip=${zip}`;
				return await fetchWeatherData(params);
		}

export { getWeatherByLatLon, getWeatherByCity, getWeatherByZip };
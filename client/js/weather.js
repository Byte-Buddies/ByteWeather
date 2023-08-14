async function fetchWeatherData(params) {
		try {
				const response = await fetch(`/weather?${params}`);
				if (response.ok) {
						const data = await response.json();
						if (data.error) {
								console.error('Server error:', data.error);
								return null;
						}
						return data;
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
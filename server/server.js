import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// endpoint to get weather data by latitude and longitude
app.get('/getWeatherByLatLon', async (req, res) => {
	const lat = req.query.latitude;
	const lon = req.query.longitude;
	const apiKey = process.env.API_KEY;
	const apiUrl = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`;

	try {
		const apiResponse = await fetch(apiUrl, {
			headers: {
				'X-Api-Key': apiKey
			},
		});
		const data = await apiResponse.json();
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred while fetching weather data.");
	}
});

// endpoint to get weather data by city name
app.get('/getWeatherByCity', async (req, res) => {
	const city = req.query.city;
	const apiKey = process.env.API_KEY;
	const apiUrl = `https://api.api-ninjas.com/v1/weather?city=${city}`;

	try {
		const apiResponse = await fetch(apiUrl, {
			headers: {
				'X-Api-Key': apiKey
			},
		});
		const data = await apiResponse.json();
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred while fetching weather data.");
	}
});

// endpoint to get weather data by zip code
app.get('/getWeatherByZip', async (req, res) => {
	const zip = req.query.zip;
	const apiKey = process.env.API_KEY;
	const apiUrl = `https://api.api-ninjas.com/v1/weather?zip=${zip}`;

	try {
		const apiResponse = await fetch(apiUrl, {
			headers: {
				'X-Api-Key': apiKey
			},
		});
		const data = await apiResponse.json();
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred while fetching weather data.");
	}
});


app.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`);
});
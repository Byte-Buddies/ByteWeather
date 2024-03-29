import express from 'express';
import fetch from 'node-fetch';
import { config } from './config.js';

const app = express();
app.use(express.static('client'));

app.get('/weather', async (req, res) => {
		const { lat, lon, city, zip } = req.query;
		console.log({ lat, lon, city, zip });

		let apiUrl;

		if (lat && lon) {
				apiUrl = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`;
		} else if (city) {
				apiUrl = `https://api.api-ninjas.com/v1/weather?city=${city}`;
		} else if (zip) {
				apiUrl = `https://api.api-ninjas.com/v1/weather?zip=${zip}`;
		} else {
				return res.status(400).json({ error: 'You must provide city or zip.' });
		}
		console.log(apiUrl);

		try {
				const apiKey = await config();
				const response = await fetch(apiUrl, {
						headers: {
								'X-Api-Key': apiKey,
						},
				});
				if (!response.ok) {
						console.error('Response from weather API was not OK', response.status, response.statusText);
						return res.status(500).json({error: 'Failed to fetch weather data.'});
				}

				const data = await response.json();

				// If lat and lon are provided, use them to get the city name
				if (lat && lon) {
						const locationResponse = await fetch(`https://api.api-ninjas.com/v1/reversegeocoding?lat=${lat}&lon=${lon}`, {
								headers: {
										'X-Api-Key': process.env.API_KEY,
								},
						});

						if (!locationResponse.ok) {
								console.error('Response from location API was not OK', locationResponse.status, locationResponse.statusText);
								return res.status(500).json({error: 'Failed to fetch location data.'});
						}

						const locationData = await locationResponse.json();

						if (Array.isArray(locationData)) {
								const firstLocation = locationData[0]; // Use only the first city from the returned list
								data.location = `${firstLocation.name}, ${firstLocation.country}`;
						}
				} else if (city || zip) {
						data.location = city ? `${city}` : `${zip}`;
				}
				res.json(data);
		} catch (error) {
				console.error('Error occurred while handling /weather request:', error);
				res.status(500).json({ error: 'Internal Server Error' });
		}
});

const port = process.env.PORT || 2000;

app.listen(2000, '0.0.0.0', () => {
		console.log(`Server started on port ${port}`);
});


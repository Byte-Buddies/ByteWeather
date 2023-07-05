require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/weather', async (req, res) => {
		const { lat, lon, city, zip } = req.query;

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

		const response = await fetch(apiUrl, {
				headers: {
						'X-Api-Key': process.env.API_KEY,
				},
		});

		if (!response.ok) {
				return res.status(500).json({ error: 'Failed to fetch weather data.' });
		}

		const data = await response.json();

		res.json(data);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

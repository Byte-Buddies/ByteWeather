import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());

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

				const response = await fetch(apiUrl, {
				headers: {
						'X-Api-Key': process.env.API_KEY,
				},
		});

				if (!response.ok) {
						console.error('Response from weather API was not OK', response.status, response.statusText);
						return res.status(500).json({ error: 'Failed to fetch weather data.' });
				}

				const data = await response.json();

				res.json(data);
		} catch (error) {
				console.error('Error occurred while handling /weather request:', error);
				res.status(500).json({ error: 'Internal Server Error' });
		}
});

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server started on port ${port}`));

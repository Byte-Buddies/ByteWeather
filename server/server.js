import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/getWeather', async (req, res) => {
		const lat = req.query.latitude;
		const lon = req.query.longitude;
		const apiKey = process.env.API_KEY;
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

	try {
				const apiResponse = await fetch(apiUrl);
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
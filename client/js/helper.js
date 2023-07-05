// Celsius to Fahrenheit conversion
function celsiusToFahrenheit(celsius) {
		return celsius * 9/5 + 32;
}

// unix to local time conversion
function unixToLocalTime(unixTime) {
		const date = new Date(unixTime * 1000);
		return {
				hours: date.getHours(),
				minutes: date.getMinutes()
		};
}

// wind speed
function msToMph(ms) {
		return ms * 2.237;
}

// wind direction
function degreesToDirection(degrees) {
		const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
		const index = Math.round(degrees / 45);
		return directions[index];
}

export { celsiusToFahrenheit, unixToLocalTime, msToMph, degreesToDirection };
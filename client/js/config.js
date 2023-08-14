let baseURL;

if (window.location.hostname === "localhost") {
		baseURL = "http://localhost:2000";
} else {
		baseURL = "byte-buddies.github.io/ByteWeather/";
}

export { baseURL };

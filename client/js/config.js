let baseURL;

if (window.location.hostname === "localhost") {
		baseURL = "http://localhost:2000";
} else {
		baseURL = "https://www.byteweather.byte-buddies.com";
}

export { baseURL };

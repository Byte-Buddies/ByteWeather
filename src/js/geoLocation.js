const getLocation = document.getElementById('loc'); //HTML Element
const message = "Unsupported browser"; //Location Unavailable

if (Modernizr.geolocation) { // checks if geolocationAPI is supported
    navigator.geolocation.getCurrentPosition(success, fail); //asks for location
    getLocation.textContent = "Checking your location..."; // alerts user of location check
} else { // if FALSE
    getLocation.textContent = message; // error message: Location Unavailable
}
function success(position) { //Location Available
    const longitude = position.coords.longitude; // gets and saves longitude
    const latitude = position.coords.latitude; // gets and saves latitude

    // work in progress - need to find a way to change lat and long into city and state

    getLocation.innerHTML = `The temperature in ${latitude}, ${longitude} is: }`; // pushes user location to the screen
}
function fail(message) { // Location Unavailable
    getLocation.textContent = message; // sends error message to HTML
    console.log(message.code); // shows error code in console
}
// add to HTML <script src="js/geoLocation.js"></script>
// add to HTML <script src="js/modernizr-custom.js"></script>
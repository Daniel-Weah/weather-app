let errorDisplay = document.getElementById('error');
let loader = document.getElementById('loader');

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    getWeatherByCity(city);
});

document.getElementById('location-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherByLocation, showError);
    } else {
        errorDisplay.textContent = 'Geolocation is not supported by this browser.';
    }
});

function getWeatherByCity(city) {
    const apiKey = '5b84b699eca8bc4d6b5beb4ea9303859'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    loader.style.display = 'block';
    errorDisplay.textContent = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            displayWeather(data);
        })
        .catch(error => {
            loader.style.display = 'none';
            console.error('Error fetching weather data:', error);
            errorDisplay.textContent = 'Could not retrieve weather data. Please try again.';
        });
}

function getWeatherByLocation(position) {
    const apiKey = '5b84b699eca8bc4d6b5beb4ea9303859'; // Replace with your OpenWeatherMap API key
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    loader.style.display = 'block';
    errorDisplay.textContent = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            displayWeather(data);
        })
        .catch(error => {
            loader.style.display = 'none';
            console.error('Error fetching weather data:', error);
            errorDisplay.textContent = 'Could not retrieve weather data. Please try again.';
        });
}

function displayWeather(data) {
    if (data.cod === '404') {
        errorDisplay.textContent = 'City not found. Please enter a valid city name.';
        return;
    }

    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

function showError(error) {
    loader.style.display = 'none';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorDisplay.textContent = 'User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorDisplay.textContent = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            errorDisplay.textContent = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            errorDisplay.textContent = 'An unknown error occurred.';
            break;
    }
}

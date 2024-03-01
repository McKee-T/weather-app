document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener to the search button
    document.getElementById('search-button').addEventListener('click', function() {
        const city = document.getElementById('city-input').value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    // Attach event listeners to all "Frequently Searched Cities" buttons
    attachEventListenersToFrequentCities();
});

function fetchWeather(city) {
    fetch(`/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            updateCurrentWeather(data);
            updateForecast(data);
        })
        .catch(error => console.log(error));
}

function updateCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    currentWeatherDiv.style.display = 'block';
    currentWeatherDiv.innerHTML = `
        <h2>Current Weather for ${data.city.name}</h2>
        <p><strong>Temperature:</strong> ${data.list[0].main.temp} °C</p>
        <p><strong>Humidity:</strong> ${data.list[0].main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.list[0].wind.speed} m/s</p>
        <img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" alt="Weather icon">
    `;
}

function updateForecast(data) {
    const forecastTilesDiv = document.querySelector('.forecast-tiles');
    forecastTilesDiv.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        const forecastTile = document.createElement('div');
        forecastTile.classList.add('forecast-tile');
        forecastTile.innerHTML = `
            <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
            <p><strong>Temp:</strong> ${day.main.temp} °C</p>
            <p><strong>Humidity:</strong> ${day.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${day.wind.speed} m/s</p>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
        `;
        forecastTilesDiv.appendChild(forecastTile);
    }
}

function attachEventListenersToFrequentCities() {
    document.querySelectorAll('.city-btn').forEach(button => {
        button.addEventListener('click', function() {
            const city = this.textContent;
            fetchWeather(city);
        });
    });
}

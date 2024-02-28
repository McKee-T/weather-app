const apiKey = "0d09fc7ee5df7b518660777e251c6898";

document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
    addToHistory(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => updateCurrentWeather(data))
        .catch(error => console.log(error));

    // Fetch forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => updateForecast(data))
        .catch(error => console.log(error));
}

function updateCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    currentWeatherDiv.innerHTML = `
        <h2>Current Weather for ${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
    `;
}

function updateForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        forecastDiv.innerHTML += `
            <div>
                <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
                <p><strong>Temp:</strong> ${day.main.temp} °C</p>
                <p><strong>Humidity:</strong> ${day.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${day.wind.speed} m/s</p>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
            </div>
        `;
    }
}

function addToHistory(city) {
    const historyDiv = document.getElementById('search-history');
    const cityButton = document.createElement('button');
    cityButton.textContent = city;
    cityButton.addEventListener('click', function() {
        fetchWeather(city);
    });
    historyDiv.appendChild(cityButton);
}

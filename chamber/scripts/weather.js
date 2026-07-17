const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastList = document.querySelector('#forecast');

const lat = 49.75;
const lon = 6.64;
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
  try {
    const response = await fetch(currentUrl);
    if (!response.ok) {
      throw new Error('Current weather data not available.');
    }
    const data = await response.json();
    displayCurrentWeather(data);
    getWeatherForecast();
  } catch (error) {
    console.error(error);
    if (currentTemp) currentTemp.textContent = 'Weather unavailable.';
    if (captionDesc) captionDesc.textContent = 'Please try again later.';
  }
}

function displayCurrentWeather(data) {
  if (!currentTemp || !weatherIcon || !captionDesc) return;

  currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
  const description = data.weather[0].description;
  captionDesc.textContent = description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', description);
}

async function getWeatherForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error('Forecast data not available.');
    }
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error(error);
    if (forecastList) forecastList.innerHTML = '<li>Forecast unavailable.</li>';
  }
}

function displayForecast(data) {
  if (!forecastList) return;

  const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'));
  forecastList.innerHTML = '';

  if (daily.length === 0) {
    forecastList.innerHTML = '<li>Forecast unavailable.</li>';
    return;
  }

  daily.slice(0, 3).forEach(item => {
    const date = new Date(item.dt_txt);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const temp = Math.round(item.main.temp);
    const listItem = document.createElement('li');
    listItem.textContent = `${dayName}: ${temp}°C`;
    forecastList.appendChild(listItem);
  });
}

apiFetch();

const apiKey = 'YOUR_API_KEY_HERE'; // Get free key from https://openweathermap.org/api
const lat = 0.3136; // Kampala
const lon = 32.5811;
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const forecastDiv = document.querySelector('#forecast');

async function apiFetch() {
    try {
        const response = await fetch(weatherURL);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    // Current weather - first item in list
    const current = data.list[0];
    currentTemp.innerHTML = `Temp: ${current.main.temp.toFixed(0)}°C`;
    weatherDesc.innerHTML = `${current.weather[0].description}`;

    // 3 Day Forecast - get 24hr, 48hr, 72hr marks
    forecastDiv.innerHTML = '';
    const days = [8, 16, 24]; // 3hr intervals * 8 = 24hrs
    days.forEach(dayIndex => {
        const dayData = data.list[dayIndex];
        const date = new Date(dayData.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        const forecastItem = document.createElement('p');
        forecastItem.innerHTML = `${dayName}: ${dayData.main.temp.toFixed(0)}°C`;
        forecastDiv.appendChild(forecastItem);
    });
}

apiFetch();
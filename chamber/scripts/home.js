// ===============================
// Mobile Navigation - SIMPLIFIED
// ===============================

const menuButton = document.querySelector('#menuButton');
const navigation = document.querySelector('#navigation');

function toggleMenu() {
    navigation.classList.toggle('open');
    menuButton.textContent = navigation.classList.contains('open') ? '✕' : '☰';
}

function closeMenu() {
    navigation.classList.remove('open');
    menuButton.textContent = '☰';
}

// Toggle on button click
if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
}

// Close when a nav link is clicked
document.querySelectorAll('#navigation a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close when clicking outside
document.addEventListener('click', (event) => {
    const isClickInside = menuButton?.contains(event.target) || navigation?.contains(event.target);
    if (!isClickInside && navigation?.classList.contains('open')) {
        closeMenu();
    }
});

// Close on Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation?.classList.contains('open')) {
        closeMenu();
        menuButton?.focus();
    }
});

// ===============================
// Active page highlighting
// ===============================

function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#navigation a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ===============================
// Weather API
// ===============================

const apiKey = 'f874dbe5fcef8e81d73a105cc78f4bf8';
const lat = 0.3476;
const lon = 32.5825;
const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherHumidity = document.querySelector('#weather-humidity');
const forecastList = document.querySelector('#forecast');

function showWeatherKeyMessage() {
    if (currentTemp) currentTemp.textContent = 'Add your OpenWeatherMap API key to chamber/scripts/home.js';
    if (weatherDesc) weatherDesc.textContent = 'OpenWeatherMap API key is required to show weather.';
    if (weatherHumidity) weatherHumidity.textContent = '';
    if (forecastList) forecastList.innerHTML = '<li>Forecast unavailable until API key is set.</li>';
}

async function getCurrentWeather() {
    if (apiKey.includes('YOUR_API_KEY')) {
        showWeatherKeyMessage();
        return false;
    }

    try {
        const response = await fetch(currentWeatherURL);
        if (!response.ok) {
            throw new Error(`Weather request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        currentTemp.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
        weatherDesc.textContent = `Conditions: ${data.weather[0].description}`;
        if (weatherHumidity) {
            weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
        }
        return true;
    } catch (error) {
        console.error(error);
        if (currentTemp) currentTemp.textContent = 'Weather unavailable.';
        if (weatherDesc) weatherDesc.textContent = 'Please try again later.';
        if (weatherHumidity) weatherHumidity.textContent = '';
        if (forecastList) forecastList.innerHTML = '<li>Forecast unavailable.</li>';
        return false;
    }
}

async function getWeatherForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) {
            throw new Error('Forecast data not available.');
        }

        const data = await response.json();
        const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'));
        if (forecastList) forecastList.innerHTML = '';

        if (daily.length === 0) {
            if (forecastList) forecastList.innerHTML = '<li>No forecast data available.</li>';
            return;
        }

        daily.slice(0, 3).forEach(item => {
            const date = new Date(item.dt_txt);
            const icon = item.weather[0].icon;
            const description = item.weather[0].description;
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="forecast-date">${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                <span class="forecast-icon"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="40" height="40"></span>
                <span class="forecast-temp">${Math.round(item.main.temp)}°C</span>
                <span class="forecast-desc">${description}</span>
            `;
            forecastList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
        if (forecastList) forecastList.innerHTML = '<li>Forecast unavailable.</li>';
    }
}

async function initChamberPage() {
    const weatherSuccess = await getCurrentWeather();
    if (weatherSuccess) {
        await getWeatherForecast();
    }
}

// ===============================
// Business Spotlights
// ===============================

const memberURL = 'data/members.json';
const spotlightsContainer = document.querySelector('#spotlights');

async function getSpotlights() {
    try {
        const response = await fetch(memberURL);
        if (!response.ok) {
            throw new Error('Unable to load member data.');
        }

        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error(error);
        spotlightsContainer.innerHTML = '<p>Member spotlights unavailable.</p>';
    }
}

function displaySpotlights(members) {
    const featured = members
        .filter(member => member.membership === 2 || member.membership === 3)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    spotlightsContainer.innerHTML = '';

    featured.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('spotlight');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel=" no opener">Visit Website</a></p>
            <p><strong>${member.membership === 3 ? 'Gold' : 'Silver'} Member</strong></p>
        `;

        spotlightsContainer.appendChild(card);
    });
}

initChamberPage();
getSpotlights();
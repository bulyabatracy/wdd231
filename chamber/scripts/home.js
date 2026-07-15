// ===============================
// Weather API
// ===============================

const apiKey = "YOUR_API_KEY";
const lat = 0.3476;
const lon = 32.5825;

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(weatherURL);

        if (!response.ok) throw Error("Weather data not available.");

        const data = await response.json();

        document.querySelector("#current-temp").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.querySelector("#weather-desc").textContent =
            data.weather[0].description;

    } catch (error) {
        console.error(error);
    }
}

async function getForecast() {
    try {

        const response = await fetch(forecastURL);

        if (!response.ok) throw Error("Forecast unavailable.");

        const data = await response.json();

        const forecast = document.querySelector("#forecast");
        forecast.innerHTML = "";

        // 12:00 PM forecast for next three days
        const daily = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        daily.slice(0, 3).forEach(day => {

            const li = document.createElement("li");

            const date = new Date(day.dt_txt);

            li.textContent =
                `${date.toLocaleDateString('en-US', { weekday: 'short' })}: ${Math.round(day.main.temp)}°C`;

            forecast.appendChild(li);

        });

    } catch (error) {
        console.error(error);
    }
}

getWeather();
getForecast();


// ===============================
// Business Spotlights
// ===============================

const memberURL = "data/members.json";

async function getMembers() {

    try {

        const response = await fetch(memberURL);

        if (!response.ok) throw Error("Unable to load members.");

        const members = await response.json();

        displaySpotlights(members);

    } catch (error) {

        console.error(error);

    }

}

function displaySpotlights(members) {

    const spotlight = document.querySelector("#spotlight-container");

    spotlight.innerHTML = "";

    // Only Silver and Gold members
    const featured = members.filter(member =>
        member.membership === 2 ||
        member.membership === 3
    );

    // Shuffle array
    featured.sort(() => 0.5 - Math.random());

    // Display first three
    featured.slice(0, 3).forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight-card");

        card.innerHTML = `

            <img src="images/${member.image}"
                 alt="${member.name} Logo"
                 loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                Membership:
                ${member.membership === 3 ? "Gold" : "Silver"}
            </p>

            <a href="${member.website}" target="_blank">
                Visit Website
            </a>

        `;

        spotlight.appendChild(card);

    });

}

getMembers();
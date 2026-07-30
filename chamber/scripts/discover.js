import { places } from "../data/places.mjs";

const discoverGrid = document.querySelector("#discover-grid");

// Create Discover Cards
places.forEach(place => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${place.title}</h2>

        <figure>
            <img src="${place.image}"
                 alt="${place.title}"
                 width="300"
                 height="200"
                 loading="lazy">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button type="button">Learn More</button>
    `;

    discoverGrid.appendChild(card);
});


// ===========================
// Last Visit Message
// ===========================

const message = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    message.textContent =
        "Welcome! Let us know if you have any questions.";
} else {

    const milliseconds = currentVisit - Number(lastVisit);
    const daysBetween = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    if (daysBetween < 1) {
        message.textContent = "Back so soon! Awesome!";
    }
    else if (daysBetween === 1) {
        message.textContent = "You last visited 1 day ago.";
    }
    else {
        message.textContent =
            `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);
import { initNavigation } from "./navigation.js";
import { openModal } from "./modal.js";
import {
    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorite
} from "./storage.js";

initNavigation();

const container = document.querySelector("#attractions-container");
const search = document.querySelector("#search");
const category = document.querySelector("#category");
const favoritesContainer = document.querySelector("#favorites");

let attractions = [];

async function loadAttractions() {

    try {

        const response = await fetch("data/attractions.json");

        if (!response.ok) {
            throw new Error("Unable to load attractions.");
        }

        attractions = await response.json();

        displayAttractions(attractions);

        displayFavorites();

    } catch (error) {

        container.innerHTML = `
            <p class="error">
                ${error.message}
            </p>
        `;

        console.error(error);

    }

}

function displayAttractions(list) {

    container.innerHTML = "";

    list.forEach(attraction => {

        const card = document.createElement("article");

        card.className = "card";

        card.innerHTML = `

            <img
                src="${attraction.image}"
                alt="${attraction.name}"
                loading="lazy">

            <h3>${attraction.name}</h3>

            <p><strong>Category:</strong> ${attraction.category}</p>

            <p><strong>Location:</strong> ${attraction.location}</p>

            <p><strong>Rating:</strong> ⭐ ${attraction.rating}</p>

            <div class="card-buttons">

                <button class="details-btn">
                    View Details
                </button>

                <button class="favorite-btn">

                    ${isFavorite(attraction.id)
                ? "Remove Favourite"
                : "Add Favourite"
            }

                </button>

            </div>

        `;

        card.querySelector(".details-btn")
            .addEventListener("click", () => {

                openModal(attraction);

            });

        card.querySelector(".favorite-btn")
            .addEventListener("click", () => {

                if (isFavorite(attraction.id)) {

                    removeFavorite(attraction.id);

                } else {

                    addFavorite(attraction);

                }

                displayFavorites();

                displayAttractions(filterData());

            });

        container.appendChild(card);

    });

}

function filterData() {

    const searchValue = search.value.toLowerCase();

    const categoryValue = category.value;

    return attractions.filter(item => {

        const matchesName =
            item.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            item.category === categoryValue;

        return matchesName && matchesCategory;

    });

}

search.addEventListener("input", () => {

    displayAttractions(filterData());

});

category.addEventListener("change", () => {

    displayAttractions(filterData());

});

function displayFavorites() {

    const favorites = getFavorites();

    if (favorites.length === 0) {

        favoritesContainer.innerHTML = `
            <p>No favourite attractions selected.</p>
        `;

        return;

    }

    favoritesContainer.innerHTML = "";

    favorites.forEach(item => {

        const div = document.createElement("div");

        div.className = "favorite-item";

        div.innerHTML = `

            <p>${item.name}</p>

        `;

        favoritesContainer.appendChild(div);

    });

}

loadAttractions();
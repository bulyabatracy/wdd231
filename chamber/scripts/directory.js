// Select Elements
const cardsContainer = document.querySelector("#cards");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

// ------------------------------
// Mobile Navigation - SIMPLIFIED
// ------------------------------

function toggleMenu() {
    navigation.classList.toggle('open');
    menuButton.textContent = navigation.classList.contains('open') ? '✕' : '☰';
}

function closeMenu() {
    navigation.classList.remove('open');
    menuButton.textContent = '☰';
}

if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
}

document.querySelectorAll('#navigation a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
    const isClickInside = menuButton?.contains(event.target) || navigation?.contains(event.target);
    if (!isClickInside && navigation?.classList.contains('open')) {
        closeMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation?.classList.contains('open')) {
        closeMenu();
        menuButton?.focus();
    }
});

// ------------------------------
// Active page highlighting
// ------------------------------

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

// ------------------------------
// Grid and List Buttons
// ------------------------------
gridBtn.addEventListener("click", () => {
    cardsContainer.classList.add("grid");
    cardsContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    cardsContainer.classList.add("list");
    cardsContainer.classList.remove("grid");
});

// ------------------------------
// Fetch Member Data
// ------------------------------
const url = "data/members.json";

async function getMemberData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error:", error);
    }
}

// ------------------------------
// Display Members
// ------------------------------
function displayMembers(members) {

    cardsContainer.innerHTML = "";

    const membershipLevels = {
        1: "Member",
        2: "Silver Member",
        3: "Gold Member"
    };

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} Logo`;
        image.loading = "lazy";
        image.width = 120;
        image.height = 120;

        const name = document.createElement("h3");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

        const website = document.createElement("p");

        const link = document.createElement("a");
        link.href = member.website;
        link.target = "_blank";
        link.rel = "no opener";
        link.textContent = "Visit Website";

        website.appendChild(link);

        const level = document.createElement("p");
        level.innerHTML =
            `<strong>Membership:</strong> ${membershipLevels[member.membership]}`;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        cardsContainer.appendChild(card);

    });

}

// ------------------------------
// Load Members
// ------------------------------
getMemberData();
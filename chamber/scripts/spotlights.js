const spotlightsContainer = document.querySelector('#spotlights');
const membersURL = 'data/members.json'; // Make sure this path is correct

async function getMemberData() {
    const response = await fetch(membersURL);
    const data = await response.json();
    displaySpotlights(data.members);
}

function displaySpotlights(members) {
    // 1. Filter only Gold = 3 and Silver = 2
    const qualified = members.filter(member => member.membership === 2 || member.membership === 3);

    // 2. Randomize and pick 3
    const randomMembers = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);

    randomMembers.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('spotlight');

        const membershipLevel = member.membership === 3 ? 'Gold' : 'Silver';

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
            <p><strong>${membershipLevel} Member</strong></p>
        `;
        spotlightsContainer.appendChild(card);
    });
}

getMemberData();
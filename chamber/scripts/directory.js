const cardsContainer = document.querySelector('#cards');
const gridBtn = document.querySelector('#gridBtn');
const listBtn = document.querySelector('#listBtn');

gridBtn.addEventListener('click', () => {
    cardsContainer.classList.add('grid');
    cardsContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
    cardsContainer.classList.add('list');
    cardsContainer.classList.remove('grid');
});

async function getMemberData() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    members.forEach(member => {
        let card = document.createElement('section');
        card.classList.add('card');

        let img = document.createElement('img');
        img.src = `images/${member.image}`;
        img.alt = `${member.name} logo`;
        img.loading = 'lazy';

        let h3 = document.createElement('h3');
        h3.textContent = member.name;

        let address = document.createElement('p');
        address.textContent = member.address;

        let phone = document.createElement('p');
        phone.textContent = member.phone;

        let website = document.createElement('a');
        website.href = member.website;
        website.textContent = "Website";
        website.target = "_blank";

        let level = document.createElement('p');
        let levels = { 1: "Member", 2: "Silver", 3: "Gold" };
        level.textContent = `Membership: ${levels[member.membership]}`;

        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        cardsContainer.appendChild(card);
    });
}

getMemberData();

// Hamburger menu
const menuButton = document.querySelector('#menuButton');
const navigation = document.querySelector('#navigation ul');
menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
});
// modal.js

const dialog = document.querySelector("#attractionModal");
const modalContent = document.querySelector("#modalContent");
const closeButton = document.querySelector("#closeModal");

// Open the modal
export function openModal(attraction) {

    if (!dialog || !modalContent) return;

    modalContent.innerHTML = `
        <img src="${attraction.image}"
             alt="${attraction.name}"
             loading="lazy">

        <h2>${attraction.name}</h2>

        <p><strong>Category:</strong> ${attraction.category}</p>

        <p><strong>Location:</strong> ${attraction.location}</p>

        <p><strong>Rating:</strong> ⭐ ${attraction.rating}</p>

        <p><strong>Entry Fee:</strong> ${attraction.entryFee}</p>

        <p><strong>Opening Hours:</strong> ${attraction.openingHours}</p>

        <p>${attraction.description}</p>
    `;

    dialog.showModal();
}

// Close button
if (closeButton) {
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
}

// Close when clicking outside
if (dialog) {
    dialog.addEventListener("click", (event) => {

        const rect = dialog.getBoundingClientRect();

        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) {
            dialog.close();
        }

    });
}
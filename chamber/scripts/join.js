// ===============================
// Responsive Navigation
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("open");

            const expanded = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", !expanded);

            menuButton.textContent = navigation.classList.contains("open") ? "✕" : "☰";
        });
    }

    // ===============================
    // Footer Information
    // ===============================
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

    // ===============================
    // Hidden Timestamp
    // ===============================
    const timestamp = document.getElementById("timestamp");
    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }
});

// ===============================
// Membership Modals - Learn More
// ===============================

// Function to open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("show");
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

// Function to close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Attach click handlers to all Learn More buttons
document.addEventListener("DOMContentLoaded", function () {
    // Open modal on Learn More button click
    const learnMoreButtons = document.querySelectorAll(".learn-more-btn");
    learnMoreButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const modalId = this.getAttribute("data-modal");
            openModal(modalId);
        });
    });

    // Close modal on Close button click
    const closeButtons = document.querySelectorAll(".modal-close");
    closeButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const modalId = this.getAttribute("data-close");
            closeModal(modalId);
        });
    });

    // Close modal when clicking outside the modal box
    const modals = document.querySelectorAll(".modal-overlay");
    modals.forEach(modal => {
        modal.addEventListener("click", function (e) {
            if (e.target === this) {
                const modalId = this.getAttribute("id");
                closeModal(modalId);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            const modals = document.querySelectorAll(".modal-overlay");
            modals.forEach(modal => {
                if (modal.classList.contains("show")) {
                    closeModal(modal.getAttribute("id"));
                }
            });
        }
    });
});
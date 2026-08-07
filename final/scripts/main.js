// main.js

import { initNavigation } from "./navigation.js";
import { populateFooter } from "./footer.js";

document.addEventListener("DOMContentLoaded", () => {

    // Responsive navigation
    initNavigation();

    // Footer dates
    populateFooter();

    const contactForm = document.querySelector('form[action="thanks.html"], form[action="thankyou.html"]');

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const params = new URLSearchParams(formData);
            const targetUrl = `thanks.html?${params.toString()}`;

            window.location.href = targetUrl;
        });
    }

});
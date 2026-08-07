// main.js

import { initNavigation } from "./navigation.js";
import { populateFooter } from "./footer.js";

document.addEventListener("DOMContentLoaded", () => {

    // Responsive navigation
    initNavigation();

    // Footer dates
    populateFooter();

});
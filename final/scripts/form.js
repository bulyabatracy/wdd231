// form.js

import { initNavigation } from "./navigation.js";
import { populateFooter } from "./footer.js";

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();
    populateFooter();

    const params = new URLSearchParams(window.location.search);

    const setValue = (id, key) => {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = params.get(key) || "Not provided";
        }
    };

    setValue("fullname", "fullname");
    setValue("email", "email");
    setValue("phone", "phone");
    setValue("country", "country");
    setValue("date", "date");
    setValue("visitors", "visitors");
    setValue("interest", "interest");
    setValue("message", "message");

    const newsletter = document.getElementById("newsletter");

    if (newsletter) {
        newsletter.textContent =
            params.get("newsletter") === "yes"
                ? "Yes"
                : "No";
    }

});
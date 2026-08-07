export function populateFooter() {
    const year = document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const modified = document.querySelector("#lastModified");

    if (modified) {
        const rawValue = document.lastModified;
        const parsedDate = rawValue ? new Date(rawValue) : new Date();

        if (!Number.isNaN(parsedDate.getTime())) {
            modified.textContent = parsedDate.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        } else {
            modified.textContent = "Not available";
        }
    }
}

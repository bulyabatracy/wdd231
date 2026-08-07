// navigation.js

export function initNavigation() {

    const menuButton = document.querySelector("#menu");
    const navigation = document.querySelector("#navigation");

    if (!menuButton || !navigation) return;

    const closeMenu = () => {
        navigation.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.textContent = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                closeMenu();
            }
        });
    });

}
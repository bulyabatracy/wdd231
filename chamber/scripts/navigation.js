const menuButton = document.querySelector('#menuButton');
const navigation = document.querySelector('#navigation');

function toggleMenu() {
    if (!menuButton || !navigation) return;

    navigation.classList.toggle('open');
    const isOpen = navigation.classList.contains('open');

    menuButton.textContent = isOpen ? '✕' : '☰';
    menuButton.setAttribute('aria-expanded', String(isOpen));
}

function closeMenu() {
    if (!menuButton || !navigation) return;

    navigation.classList.remove('open');
    menuButton.textContent = '☰';
    menuButton.setAttribute('aria-expanded', 'false');
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

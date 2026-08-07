// storage.js

const STORAGE_KEY = "favoriteAttractions";

// Get favorites
export function getFavorites() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Save favorites
export function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

// Add favorite
export function addFavorite(attraction) {

    const favorites = getFavorites();

    const exists = favorites.some(item => item.id === attraction.id);

    if (!exists) {
        favorites.push(attraction);
        saveFavorites(favorites);
    }

}

// Remove favorite
export function removeFavorite(id) {

    const favorites = getFavorites().filter(item => item.id !== id);

    saveFavorites(favorites);

}

// Check if favorite
export function isFavorite(id) {

    return getFavorites().some(item => item.id === id);

}

// Clear all favorites
export function clearFavorites() {

    localStorage.removeItem(STORAGE_KEY);

}
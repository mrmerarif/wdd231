// scripts/storage.js

// Save a recipe to favorites
export function saveFavorite(recipe) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Prevent duplicates by checking title
  if (!favorites.some(r => r.title === recipe.title)) {
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

// Get all saved favorites
export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Remove all favorites
export function clearFavorites() {
  localStorage.removeItem("favorites");
}

// scripts/main.js

// Global recipes array
let recipes = [];

// Fetch recipes from local JSON file (asynchronous requirement)
async function loadRecipes() {
  try {
    const response = await fetch("data/recipes.json"); // adjust path if needed
    if (!response.ok) throw new Error("Network response was not ok");
    recipes = await response.json();
    renderRecipes();
  } catch (error) {
    console.error("Error loading recipes:", error);
    // Fallback to sample data if fetch fails
    recipes = [
      {
        title: "Creamy Tuscan Chicken",
        image: "images/creamy-tuscan-chicken.webp",
        description: "Juicy chicken in a creamy garlic sauce with spinach and sun-dried tomatoes.",
        ingredients: [
          "Chicken breasts",
          "Garlic",
          "Spinach",
          "Sun-dried tomatoes",
          "Heavy cream"
        ],
        steps: [
          "Season and sear chicken until golden.",
          "Add garlic, cream, and sun-dried tomatoes.",
          "Simmer until sauce thickens.",
          "Stir in spinach and serve hot."
        ]
      },
      {
        title: "Garlic Butter Shrimp",
        image: "images/garlic-butter-shrimp.webp",
        description: "Quick shrimp sautéed in garlic butter with lemon.",
        ingredients: [
          "Shrimp",
          "Garlic",
          "Butter",
          "Lemon juice",
          "Parsley"
        ],
        steps: [
          "Melt butter in skillet.",
          "Add garlic and sauté briefly.",
          "Add shrimp and cook until pink.",
          "Finish with lemon juice and parsley."
        ]
      },
      {
        title: "Honey Garlic Chicken",
        image: "images/honey-chicken-main.webp",
        description: "Sweet and savory chicken glazed with honey garlic sauce.",
        ingredients: [
          "Chicken thighs",
          "Garlic",
          "Soy sauce",
          "Honey",
          "Sesame seeds"
        ],
        steps: [
          "Sear chicken until browned.",
          "Add garlic, soy sauce, and honey.",
          "Simmer until chicken is glazed.",
          "Sprinkle sesame seeds before serving."
        ]
      }
    ];
    renderRecipes();
  }
}

// Render recipes into grid
function renderRecipes() {
  const container = document.getElementById("recipes-container");
  container.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" loading="lazy">
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <button class="view-btn" data-index="${index}">View Recipe</button>
    `;

    container.appendChild(card);
  });

  // Attach event listeners for modal (prevent duplicates)
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.replaceWith(btn.cloneNode(true));
  });

  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      openModal(recipes[idx]);
    });
  });
}

// Modal logic
function openModal(recipe) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}" class="modal-img">
      <p>${recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      <h3>Steps</h3>
      <ol>${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal
  modal.querySelector(".close").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", loadRecipes);

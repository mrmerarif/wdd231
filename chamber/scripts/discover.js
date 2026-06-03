// ===============================
// Discover Page JavaScript
// ===============================

// ----- Visit Counter -----
const visitMessage = document.getElementById("visit-message");
const lastVisit = Number(localStorage.getItem("lastVisit")) || 0;
const today = Date.now();

if (lastVisit === 0) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysBetween = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));

  if (daysBetween === 0) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
  }
}

localStorage.setItem("lastVisit", today);

// ===============================
// IMPORT ATTRACTIONS
// ===============================
import { attractions } from "../data/discover.mjs";

// ===============================
// MODAL SETUP
// ===============================
const attractionGrid = document.getElementById("attraction-grid");
const modal = document.getElementById("attraction-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalAddress = document.getElementById("modal-address");
const modalCost = document.getElementById("modal-cost");
const modalHours = document.getElementById("modal-hours");
const modalPhone = document.getElementById("modal-phone");
const modalWebsite = document.getElementById("modal-website");
const modalClose = document.getElementById("modal-close");

// ===============================
// BUILD ATTRACTION CARDS
// ===============================
attractions.forEach((place) => {
  const card = document.createElement("div");
  card.classList.add("attraction-card");

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img data-src="images/${place.photo}" alt="${place.name}" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button class="learn-more">Learn More</button>
  `;

  const button = card.querySelector(".learn-more");
  button.addEventListener("click", () => {
    modalTitle.textContent = place.name;
    modalDescription.textContent = place.description;
    modalAddress.textContent = place.address;
    modalCost.textContent = `Cost: ${place.cost}`;
    modalHours.textContent = `Hours: ${place.hours}`;
    modalPhone.textContent = place.phone ? `Phone: ${place.phone}` : "";
    modalWebsite.href = place.website;
    modal.style.display = "block";
  });

  attractionGrid.appendChild(card);
});

// Close modal
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// ===============================
// LAZY LOADING IMAGES
// ===============================
const images = document.querySelectorAll("img[data-src]");

const loadImage = (img) => {
  const src = img.dataset.src;
  if (!src) return;
  img.src = src;
  img.removeAttribute("data-src");
};

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px 50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

images.forEach((img) => {
  observer.observe(img);
});

// -----------------------------
// Mobile Navigation Toggle
// -----------------------------
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    
    menuToggle.textContent = isOpen ? "✕" : "☰";

    // Accessibility: 
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

// -----------------------------
// Footer Year + Last Modified
// -----------------------------
const yearSpan = document.querySelector("#current-year");
const lastModifiedSpan = document.querySelector("#last-modified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}

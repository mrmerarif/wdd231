// ===============================
// Discover Page JavaScript
// ===============================

// ----- Visit Counter -----
const visitMessage = document.getElementById("visit-message");
const lastVisit = Number(localStorage.getItem("lastVisit")) || 0;
const today = Date.now();

if (lastVisit === 0) {
  visitMessage.textContent = "Welcome! This is your first visit.";
} else {
  const daysBetween = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));

  if (daysBetween === 0) {
    visitMessage.textContent = "Welcome back! You visited today.";
  } else if (daysBetween === 1) {
    visitMessage.textContent = "Welcome back! Your last visit was 1 day ago.";
  } else {
    visitMessage.textContent = `Welcome back! Your last visit was ${daysBetween} days ago.`;
  }
}

localStorage.setItem("lastVisit", today);

// ----- Lazy Loading Images -----
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

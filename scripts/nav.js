<<<<<<< HEAD
const menuButton = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  // Update aria-expanded
  menuButton.setAttribute("aria-expanded", isOpen);

  // Change icon
  menuButton.textContent = isOpen ? "✖" : "☰";
});
=======
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  if (navLinks.classList.contains('open')) {
    menuToggle.textContent = '✕';
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
  } else {
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }
});
>>>>>>> 6545a3e (Clean finalproject structure)

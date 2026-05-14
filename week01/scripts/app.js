const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

// Footer dynamic dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Dark mode toggle
const darkToggle = document.getElementById("darkmode-toggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

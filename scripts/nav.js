const menuButton = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  // Update aria-expanded
  menuButton.setAttribute("aria-expanded", isOpen);

  // Change icon
  menuButton.textContent = isOpen ? "✖" : "☰";
});

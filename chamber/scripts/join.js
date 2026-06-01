// ===============================
// Join Page JavaScript
// ===============================

// ----- Timestamp Injection -----
const timestampField = document.getElementById("timestamp");

if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// ----- Modal Logic -----
const modalButtons = document.querySelectorAll(".view-button");
const modals = {
  np: document.getElementById("np-modal"),
  bronze: document.getElementById("bronze-modal"),
  silver: document.getElementById("silver-modal"),
  gold: document.getElementById("gold-modal")
};

// Open modal
modalButtons.forEach(button => {
  button.addEventListener("click", () => {
    const level = button.dataset.level;
    const modal = modals[level];
    if (modal) modal.showModal();
  });
});

// Close modal
document.querySelectorAll("[data-close-modal]").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    const dialog = closeBtn.closest("dialog");
    dialog.close();
  });
});

// (Menu toggle + footer year + last modified are handled globally in global.js)

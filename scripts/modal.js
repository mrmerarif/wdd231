// scripts/modal.js

export function openModal(content) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      ${content}
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal on ✖
  modal.querySelector(".close").addEventListener("click", () => modal.remove());

  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

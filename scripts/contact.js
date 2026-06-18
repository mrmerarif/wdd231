// scripts/contact.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (!form) return; // safety check

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect fields
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    let valid = true;

    // Reset error styles
    [name, email, message].forEach(field => {
      field.classList.remove("error");
    });

    // Validate name
    if (name.value.trim() === "") {
      valid = false;
      name.classList.add("error");
      alert("Please enter your name.");
    }

    // Validate email
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email.value.trim())) {
      valid = false;
      email.classList.add("error");
      alert("Please enter a valid email address.");
    }

    // Validate message
    if (message.value.trim().length < 10) {
      valid = false;
      message.classList.add("error");
      alert("Message must be at least 10 characters long.");
    }

    // If valid, redirect to thank‑you page
    if (valid) {
      form.reset();
      window.location.href = "thankyou.html";
    }
  });
});

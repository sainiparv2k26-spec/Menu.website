// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile nav after clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Simple contact form message
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  formMessage.textContent =
    "Thank you. Your inquiry has been received. We will get back to you shortly.";

  contactForm.reset();
});
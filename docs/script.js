// Navbar scroll effect
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===============================
// FORM HANDLING (UPDATED)
// ===============================

const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

const notifyForm = document.getElementById('notifyForm');
const notifySuccess = document.getElementById('notifySuccess');

function handleFormSubmit(form, successElement) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        form.style.display = "none";
        successElement.classList.add("show");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form. Please try again.");
    }
  });
}

// Apply to both forms
if (bookingForm && formSuccess) {
  handleFormSubmit(bookingForm, formSuccess);
}

if (notifyForm && notifySuccess) {
  handleFormSubmit(notifyForm, notifySuccess);
}

// ===============================
// Fade-in on scroll (Intersection Observer)
// ===============================
const fadeEls = document.querySelectorAll(
  '.room-card, .amenity-card, .gallery-item, .highlight-item, .about-badge, .stat, .early-perks li'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(30px)', 'translateY(0)');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = (el.style.transform || '') + ' translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===============================
// Set min date for date inputs
// ===============================
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];

dateInputs.forEach(input => {
  input.setAttribute('min', today);
});

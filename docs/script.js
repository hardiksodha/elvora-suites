// Navbar scroll effect
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');
const notifyForm = document.getElementById('notifyForm');
const notifySuccess = document.getElementById('notifySuccess');
const checkInDate = document.getElementById('checkInDate');
const checkOutDate = document.getElementById('checkOutDate');

window.addEventListener('scroll', () => {
  if (navbar && window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else if (navbar) {
    navbar.classList.remove('scrolled');
  }

  if (backToTop && window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else if (backToTop) {
    backToTop.classList.remove('visible');
  }
});

// Mobile menu toggle
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function syncCheckoutDate() {
  if (!checkInDate || !checkOutDate) {
    return;
  }

  const minCheckoutDate = checkInDate.value || formatLocalDate(new Date());
  checkOutDate.min = minCheckoutDate;

  if (checkOutDate.value && checkOutDate.value < minCheckoutDate) {
    checkOutDate.value = minCheckoutDate;
  }

  checkOutDate.setCustomValidity('');
}

async function handleFormSubmit(form, successElement) {
  if (!form) {
    return;
  }

  if (!form.reportValidity()) {
    return;
  }

  if (form === bookingForm && checkInDate && checkOutDate && checkOutDate.value < checkInDate.value) {
    checkOutDate.setCustomValidity('Check-out date must be after check-in date.');
    checkOutDate.reportValidity();
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method || 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }

    form.reset();
    form.style.display = 'none';

    if (successElement) {
      successElement.classList.add('show');
    }
  } catch (error) {
    window.alert('Error submitting form. Please try again.');
  }
}

if (bookingForm) {
  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleFormSubmit(bookingForm, formSuccess);
  });
}

if (notifyForm) {
  notifyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleFormSubmit(notifyForm, notifySuccess);
  });
}

// Fade-in on scroll (Intersection Observer)
const fadeEls = document.querySelectorAll(
  '.room-card, .amenity-card, .gallery-item, .highlight-item, .about-badge, .stat, .early-perks li'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.style.transform.replace('translateY(30px)', 'translateY(0)');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = `${el.style.transform || ''} translateY(30px)`;
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Set min date for date inputs using the visitor's local date, not UTC.
const today = formatLocalDate(new Date());

if (checkInDate && checkOutDate) {
  checkInDate.min = today;
  checkOutDate.min = today;

  checkInDate.addEventListener('input', syncCheckoutDate);
  checkOutDate.addEventListener('input', () => {
    checkOutDate.setCustomValidity('');
  });

  syncCheckoutDate();
}

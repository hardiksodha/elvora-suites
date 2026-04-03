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
const FORM_TIMEOUT_MS = 30000;
const GOOGLE_FORM_TIMEOUT_MS = 30000;

const googleFormTargets = {
  bookingForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdIdvLWojo8Q43E1yQyRhANmNiTZqBLeM94SZfwN7N4_Js63Q/formResponse',
    buildPayload: (formData) => {
      const checkIn = splitDateParts(formData.get('customer_checkin_date'));
      const checkOut = splitDateParts(formData.get('customer_checkout_date'));
      const payload = new URLSearchParams();

      payload.set('entry.715896419', formData.get('customer_name') || '');
      payload.set('entry.718966432', formData.get('customer_email') || '');
      payload.set('entry.517937547_year', checkIn.year);
      payload.set('entry.517937547_month', checkIn.month);
      payload.set('entry.517937547_day', checkIn.day);
      payload.set('entry.1795426448_year', checkOut.year);
      payload.set('entry.1795426448_month', checkOut.month);
      payload.set('entry.1795426448_day', checkOut.day);
      payload.set('entry.1395717743', formData.get('customer_room_type') || '');
      payload.set('entry.2108589423', formData.get('customer_guest_count') || '');
      payload.set('entry.1106160743', formData.get('customer_contact_number') || '');
      payload.set('entry.1793375818', formData.get('customer_special_request') || '');

      return payload;
    }
  },
  notifyForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSd4IdFONCwfPBJ5NkbxvwYwX0iS7lngeWgiGbR0is89rcktvQ/formResponse',
    buildPayload: (formData) => {
      const payload = new URLSearchParams();

      payload.set('entry.2005620554', formData.get('customer_name') || '');
      payload.set('entry.1045781291', formData.get('customer_email') || '');
      payload.set('entry.1166974658', formData.get('customer_mobile') || '');
      payload.set('entry.839337160', formData.get('customer_preference') || '');

      return payload;
    }
  }
};

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

function splitDateParts(value) {
  if (!value || typeof value !== 'string') {
    return { year: '', month: '', day: '' };
  }

  const [year = '', month = '', day = ''] = value.split('-');
  return { year, month, day };
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function submitToGoogleForm(form, formData) {
  const target = googleFormTargets[form.id];

  if (!target) {
    return;
  }

  const payload = target.buildPayload(formData);

  try {
    await fetchWithTimeout(target.url, {
      method: 'POST',
      mode: 'no-cors',
      body: payload
    }, GOOGLE_FORM_TIMEOUT_MS);
  } catch (error) {
    // Google Form logging is best-effort and must not affect the user flow.
  }
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
    const response = await fetchWithTimeout(form.action, {
      method: form.method || 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    }, FORM_TIMEOUT_MS);

    if (!response.ok) {
      throw new Error('Form submission failed');
    }

    void submitToGoogleForm(form, formData);

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

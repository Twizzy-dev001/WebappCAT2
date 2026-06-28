// ── ACTIVE NAV LINK ──
(function setActiveNav() {
  const links = document.querySelectorAll('.navbar-nav .nav-link');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── CONTACT FORM VALIDATION ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    contactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    contactForm.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');

    const name  = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const msg   = document.getElementById('contactMessage');

    if (!name.value.trim() || name.value.trim().length < 2) {
      showError(name, 'Please enter your full name.');
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    if (!msg.value.trim() || msg.value.trim().length < 10) {
      showError(msg, 'Message must be at least 10 characters.');
      valid = false;
    }

    if (valid) {
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        showSuccessMessage();
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }, 1200);
    }
  });
}

function showError(field, message) {
  field.classList.add('is-invalid');
  const feedback = field.nextElementSibling;
  if (feedback && feedback.classList.contains('invalid-feedback')) {
    feedback.textContent = message;
  }
}

function showSuccessMessage() {
  const existing = document.getElementById('formSuccess');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.id = 'formSuccess';
  div.className = 'alert alert-success mt-3';
  div.innerHTML = '✅ <strong>Message sent!</strong> We\'ll get back to you within 24 hours.';
  contactForm.after(div);
  setTimeout(() => div.remove(), 5000);
}

// ── NEWSLETTER FORM ──
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('newsletterEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const feedback = document.getElementById('newsletterFeedback');

    if (!emailRegex.test(input.value.trim())) {
      feedback.textContent = 'Please enter a valid email.';
      feedback.style.color = '#c0392b';
      return;
    }
    feedback.textContent = '🌿 You\'re subscribed! Welcome to the Kale & Co. family.';
    feedback.style.color = 'var(--lime)';
    input.value = '';
  });
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-up');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}
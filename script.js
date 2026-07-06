// AbhaTech site behaviors: mobile nav, FAQ accordion, scroll reveal

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Contact form -> opens a pre-filled WhatsApp chat (no backend required)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#name').value.trim();
      const business = contactForm.querySelector('#business').value;
      const budget = contactForm.querySelector('#budget').value;
      const phone = contactForm.querySelector('#phone').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      const lines = [
        `Hi AbhaTech, I'd like to talk about growing my business.`,
        name ? `Name: ${name}` : null,
        business ? `Business type: ${business}` : null,
        budget ? `Monthly budget: ${budget}` : null,
        phone ? `Phone: ${phone}` : null,
        message ? `Details: ${message}` : null
      ].filter(Boolean).join('\n');

      const waNumber = '919999999999'; // TODO: replace with AbhaTech's real WhatsApp number
      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines)}`;
      window.open(url, '_blank');
    });
  }

  // Highlight active nav link based on current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});

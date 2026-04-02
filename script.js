// ===== SyUNi Studio LP - Script =====

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  let overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function toggleNav() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  }

  function closeNav() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleNav);
  overlay.addEventListener('click', closeNav);

  // Close nav on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  const hero = document.getElementById('hero');
  function updateHeader() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom > 0) {
      header.classList.add('is-hero');
    } else {
      header.classList.remove('is-hero');
    }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // --- Scroll fade-in ---
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -10px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Google Form submit ---
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdl7lgu2AsWkUTB2fkfCBQJUnxeT6wqfo-Te0aZD_e0TU7T2Q/formResponse';
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '送信中...';
      btn.disabled = true;
      btn.style.opacity = '0.6';

      const formData = new FormData(form);
      fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      }).then(() => {
        btn.textContent = '送信しました！';
        btn.style.background = '#22c55e';
        form.reset();
        setTimeout(() => {
          btn.textContent = '無料相談を予約する';
          btn.disabled = false;
          btn.style.opacity = '1';
          btn.style.background = '';
        }, 5000);
      }).catch(() => {
        btn.textContent = '送信に失敗しました。もう一度お試しください。';
        btn.disabled = false;
        btn.style.opacity = '1';
      });
    });
  }
});

/* ========================================
   SyUNi Studio LP - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
  // --- Hamburger Menu ---
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-active');
      nav.classList.toggle('is-open');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close menu on nav link click
    var navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('is-active');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Fade-in ---
  var fadeEls = document.querySelectorAll('.fade-in');

  function checkFade() {
    var trigger = window.innerHeight * 0.88;
    fadeEls.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add('is-visible');
      }
    });
  }

  window.addEventListener('scroll', checkFade, { passive: true });
  checkFade();

  // --- Header shadow on scroll ---
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  // --- Smooth scroll for CTA buttons ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Contact Form (placeholder submit) ---
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('お問い合わせありがとうございます。\nこちらはデモフォームです。実際の送信機能は後日実装されます。');
      form.reset();
    });
  }
});

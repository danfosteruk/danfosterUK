/* ============================================
   Dan Foster - main.js
   Scroll animations, accordion, smooth scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Scroll-triggered fade-in --- */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = document.querySelector('.sticky-nav') ? 60 : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* --- Accordion --- */
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const content = item.querySelector('.accordion__content');
      const isOpen = item.classList.contains('is-open');

      // Close all siblings in the same accordion
      const accordion = item.closest('.accordion');
      accordion.querySelectorAll('.accordion__item').forEach(sibling => {
        sibling.classList.remove('is-open');
        sibling.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
        sibling.querySelector('.accordion__content').style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

});

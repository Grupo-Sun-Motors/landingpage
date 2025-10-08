/* ...existing code... */
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle - improved: toggle header 'nav-active' and mobile menu visibility
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const header = document.querySelector('.site-header');

  burger.addEventListener('click', () => {
    header.classList.toggle('nav-active');
    // sync hidden attribute for accessibility
    if (header.classList.contains('nav-active')) {
      mobileMenu.removeAttribute('hidden');
      burger.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Gallery thumbnail click
  const thumbs = Array.from(document.querySelectorAll('.thumb'));
  const current = document.getElementById('currentImage');
  // initialize thumbnails' background images from data-src
  thumbs.forEach(t => {
    t.style.backgroundImage = `url('${t.dataset.src}')`;
  });

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      // swap main image
      const src = t.dataset.src;
      current.src = src;
      // active state
      thumbs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
  });

  // Color swatches - visual feedback
  document.querySelectorAll('.swatch').forEach(s => {
    s.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach(x => x.style.outline = 'none');
      s.style.outline = '3px solid rgba(13,71,161,0.15)';
      // In a real app this could swap bike images/colors
    });
  });

  // Basic form handling (prevent actual submit and show a simple confirmation)
  const handleSubmit = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // minimal validation: native constraints will flag required fields
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // simple feedback
      alert('Obrigado! Sua solicitação foi enviada.');
      form.reset();
      // on desktop keep user on page; on mobile scroll back to top for clarity
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const desktopForm = document.getElementById('interestForm');
  const mobileForm = document.getElementById('interestFormMobile');
  if (desktopForm) handleSubmit(desktopForm);
  if (mobileForm) handleSubmit(mobileForm);
});
/* ...existing code... */
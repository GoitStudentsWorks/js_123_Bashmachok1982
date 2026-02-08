document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mob-menu-btn');
  const closeBtn = document.querySelector('.menu-close-btn');
  const mobileMenu = document.querySelector('#mobileMenu');
  const body = document.body;

  menuBtn?.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    body.classList.add('menu-open'); // для блокировки скролла
  });

  // Закрытие меню
  closeBtn?.addEventListener('click', closeMenu);

  // Закрытие по клику вне меню (на фон)
  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  // Закрытие по Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Закрытие при клике на ссылку (особенно удобно для одностраничника)
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    body.classList.remove('menu-open');
  }

  // Опционально: фиксированный хедер + смена стиля при скролле
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      document.querySelector('.header').classList.add('scrolled');
    } else {
      document.querySelector('.header').classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
});

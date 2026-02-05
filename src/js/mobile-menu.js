const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');
const menu = document.querySelector('[data-menu]');
const links = document.querySelectorAll('.mobile-menu__link');

if (openBtn && menu) {
  openBtn.addEventListener('click', () => {
    menu.classList.add('is-open');
    openBtn.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeMenu);
}

links.forEach(link => {
  link.addEventListener('click', closeMenu);
});

function closeMenu() {
  menu.classList.remove('is-open');
  openBtn.classList.remove('is-active');
  document.body.style.overflow = '';
}
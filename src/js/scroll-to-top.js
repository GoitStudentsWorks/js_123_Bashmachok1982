const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const heroSection = document.getElementById('hero');

// Показати/приховати кнопку в залежності від позиції скролу
function toggleScrollButton() {
  if (!heroSection) return;

  const heroHeight = heroSection.offsetHeight;
  const scrollPosition = window.scrollY;

  if (scrollPosition > heroHeight) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
}

// Плавний скрол вгору
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// Слухачі подій
window.addEventListener('scroll', toggleScrollButton);
scrollToTopBtn.addEventListener('click', scrollToTop);

// Перевірити позицію при завантаженні
toggleScrollButton();

//  DMYTRO SERHIIENKO

export function showLoader() {
  const loader = document.createElement('div');
  loader.classList.add('artist-loader');
  loader.innerHTML = `
    <div class="artist-loader-spinner"></div>
  `;
  loader.setAttribute('data-loader', '');
  document.body.appendChild(loader);
}

export function hideLoader() {
  const loader = document.querySelector('[data-loader]');
  if (loader) {
    loader.remove();
  }
}
//  DMYTRO SERHIIENKO

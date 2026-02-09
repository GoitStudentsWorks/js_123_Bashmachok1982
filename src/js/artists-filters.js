import iconsUrl from '../img/icons.svg';
const BASE_URL = 'https://sound-wave.b.goit.study/api/artists';
const searchForm = document.querySelector('[data-artists-search-form]');
const searchInput = document.querySelector('[data-artists-search]');
const resetBtn = document.querySelector('[data-artists-reset]');
const artistsList = document.querySelector('.artists__list');
let currentPage = 1;
let limit = 8;
let currentGenre = '';
let currentSort = 'asc';
let currentSearch = '';

async function getArtists(limit, page, sort, genre, search) {
  try {
    let url = `${BASE_URL}?limit=${limit}&page=${page}&sortName=${sort}`;
    if (genre) url += `&genre=${encodeURIComponent(genre)}`;
    if (search) url += `&name=${encodeURIComponent(search)}`;

    const response = await fetch(url);
    const data = await response.json();
    if (!data.artists) throw new Error('error get data from api');
    return data.artists;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fillGenres() {
  try {
    const response = await fetch('https://sound-wave.b.goit.study/api/genres');
    const genres = await response.json();
    const genreMenu = document.querySelector('[data-genres-menu]');
    const genreSelect = document.getElementById('genre-filter');

    const markup = genres
      .map(
        ({ genre }) =>
          `<li class="afilters__item" data-genre="${genre}">${genre}</li>`
      )
      .join('');

    genreMenu.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.error('Не зміг завантажити жанри:', error);
  }
}

function initDropdowns() {
  document.querySelectorAll('.afilters__select').forEach(btn => {
    btn.addEventListener('click', e => {
      const currentMenu = btn.nextElementSibling;

      document.querySelectorAll('.afilters__menu').forEach(menu => {
        if (menu !== currentMenu) menu.classList.remove('is-open');
      });
      currentMenu.classList.toggle('is-open');
    });
  });

  // Sort
  document.querySelector('[data-sort-menu]').addEventListener('click', e => {
    if (e.target.classList.contains('afilters__item')) {
      currentSort = e.target.dataset.sort || 'asc';
      document.querySelector('[data-sort-value]').textContent =
        e.target.textContent;
      closeMenus();
      resetAndLoad();
    }
  });

  // Genre
  document.querySelector('[data-genres-menu]').addEventListener('click', e => {
    if (e.target.classList.contains('afilters__item')) {
      currentGenre = e.target.dataset.genre || '';
      document.querySelector('[data-genre-value]').textContent =
        e.target.textContent;
      closeMenus();
      resetAndLoad();
    }
  });
}

function closeMenus() {
  document
    .querySelectorAll('.afilters__menu')
    .forEach(menu => menu.classList.remove('is-open'));
}

function resetAndLoad() {
  currentPage = 1;
  loadArtists();
}

// Рендер

function loadArtists() {
  getArtists(limit, currentPage, currentSort, currentGenre, currentSearch).then(
    artists => {
      if (Array.isArray(artists)) {
        renderArtists(artists);
        updatePagination(artists.length);
      }
    }
  );
}

function updatePagination(itemsCount) {
  const pageInfo = document.getElementById('page-info');
  if (pageInfo) pageInfo.textContent = `Page ${currentPage}`;

 
}

// --- 4. Слухачі подій ---

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  currentSearch = searchInput.value.trim();
  resetAndLoad();
});

resetBtn.addEventListener('click', () => {
  currentSearch = '';
  currentGenre = '';
  currentSort = 'asc';
  searchInput.value = '';
  document.querySelector('[data-sort-value]').textContent = 'Default';
  document.querySelector('[data-genre-value]').textContent = 'All Genres';
  resetAndLoad();
});

// Закриття меню
document.addEventListener('click', e => {
  if (!e.target.closest('.afilters__block')) closeMenus();
});

function truncateText(text, maxLength) {
    // якщо text undefined, розвертаємо...
    if (typeof text !== 'string') {
      return '';
    }
    // різна довжина
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      maxLength = 60;
    } else if (screenWidth < 1440) {
      maxLength = 160;
    } else {
      maxLength = 144;
    }
  
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
  
function sanitizeText(text) {
    return text.replace(/[,/]/g, ' ');
  }

function renderArtists(arr) {
  const markup = arr
    .map(
      ({ _id, genres, strArtist, strArtistThumb, strBiographyEN }) =>
        `
        <li class="artists__card">
  
          <img class="artists__card-image" src="${strArtistThumb}" alt="${strArtist}"/>
  
          <ul class="artists__card-genres">
          ${genres
            .map(
              genre =>
                `<li class="artists__card-genre">${sanitizeText(genre)}</li>`
            )
            .join('')}
          </ul>
          <p class="artists__card-name">${strArtist}</p>
          <p class="artists__card-description">${truncateText(
            strBiographyEN,
            144
          )}</p>
         <button class="artists__card-btn open-artist-modal" data-artist-id="${_id}">
         Learn More
          <svg class="artists__card-btn-icon" width="24" height="24">
              <use href="${iconsUrl}#icon-caret-right"></use>
            </svg>
         </button>
       </li>
        `
    )
    .join('');
  artistsList.innerHTML = markup;
}

loadArtists();
fillGenres();
initDropdowns();

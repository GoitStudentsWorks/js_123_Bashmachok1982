/* DMYTRO SERHIIENKO  */

import axios from 'axios';
import { openArtistModal } from './artist-details-modal.js';

const refs = {
  artistsList: document.querySelector('#artists-list'),
  loadMoreBtn: document.querySelector('#load-more'),
};

const { artistsList, loadMoreBtn } = refs;

const BASE_URL = 'https://sound-wave.b.goit.study/api/artists';
let allArtists = [];
let displayedCount = 0;
const STEP = 8;

async function initArtists() {
  try {
    const response = await axios.get(BASE_URL);
    const data = response.data;

    allArtists = Array.isArray(data)
      ? data
      : data.results || data.data || data.artists || [];

    loadMore();
  } catch (error) {
    console.error(`Error fetching artists: ${error.message}`);
    showErrorMessage();
  }
}

function showErrorMessage() {
  artistsList.innerHTML =
    '<p style="color: white; text-align: center;">Не вдалося завантажити артистів❗️</p>';
}

function loadMore() {
  const nextBatch = allArtists.slice(displayedCount, displayedCount + STEP);
  renderArtists(nextBatch);
  displayedCount += nextBatch.length;

  if (displayedCount >= allArtists.length) {
    loadMoreBtn.style.display = 'none';
  }
}

function renderGenres(artist) {
  if (artist.genres && artist.genres.length > 0) {
    return artist.genres
      .map(genre => `<span class="genre-tag">${genre}</span>`)
      .join('');
  }
  return `<span class="genre-tag">${artist.strGenre || 'Music'}</span>`;
}

function getArtistBio(artist) {
  return artist.strBiographyEN || artist.bio || 'No biography available';
}

function getArtistId(artist) {
  return artist._id || artist.idArtist;
}

function renderArtists(artists) {
  const markup = artists
    .map(
      artist => `
      <li class="artist-card" data-id="${getArtistId(artist)}">
        <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" class="artist-card__photo" loading="lazy">
        <div class="artist-card__genres">${renderGenres(artist)}</div>
        <h3 class="artist-card__name">${artist.strArtist}</h3>
        <p class="artist-card__bio">${getArtistBio(artist)}</p>
        <button type="button" class="artist-card__link js-learn-more">
          Learn More 
          <svg class="icon-learn-more" width="16" height="16">
            <use href="./img/icons.svg#icon-caret-right"></use>
          </svg>
        </button>
      </li>
    `
    )
    .join('');
  artistsList.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.addEventListener('click', loadMore);

artistsList.addEventListener('click', event => {
  const learnMoreBtn = event.target.closest('.js-learn-more');
  if (learnMoreBtn) {
    const card = event.target.closest('.artist-card');
    openArtistModal(card.dataset.id);
  }
});

initArtists();

/* DMYTRO SERHIIENKO  */

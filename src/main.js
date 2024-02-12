// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const searchForm = document.querySelector('.js-search-form');
const photoContainer = document.querySelector('.js-photo-container');
const loadMore = document.querySelector('.js-load-more');
const loader = document.querySelector('.loader');

let currentPage = 1;

let defaultPageSize = 15;

let currentQuery = '';

let totalResult = 0;

function photoTemplate(photo) {
  return photo.hits
    .map(
      photo => `<li class="gallery-item"><a class="gallery-link" href="${photo.largeImageURL}">
    <img
      src="${photo.webformatURL}"
      data-source="${photo.largeImageURL}"
      alt="${photo.tags}"
      class="gallery-image"
      
    /></a>  

  <div class="image-stats-block">
<ul class="image-stats-list">
  <li class="image-stats-item"><p class="image-stats-text">Likes:<br><span class="image-stats-value">${photo.likes}</span></p>
</li>
<li class="image-stats-item">
  <p class="image-stats-text">Views:<br><span class="image-stats-value">${photo.views}</span></p>
</li>
<li class="image-stats-item">
  <p class="image-stats-text">Comments:<br><span class="image-stats-value">${photo.comments}</span></p>
</li>
<li class="image-stats-item">
  <p class="image-stats-text">Downloads:<br><span class="image-stats-value">${photo.downloads}</span></p>
</li>
</ul>
  </div></li>`
    )
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function renderPhoto(photo) {
  if (photo.hits.length === 0) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      closeOnClick: true,
      closeOnEscape: true,
    });
  } else {
    totalResult = photo.total;
    const markup = photoTemplate(photo);
    photoContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }
}

// ====================================================================

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  currentPage = 1;
  photoContainer.replaceChildren();
  currentQuery = e.target.elements.query.value.trim();
  try {
    if (currentQuery.length === 0) {
      iziToast.show({
        message: 'Search field cannot be empty!',
        closeOnClick: true,
        closeOnEscape: true,
      });
    } else {
      loader.classList.add('loader-shown');
      const data = await searchPhoto(currentQuery);

      renderPhoto(data);
      loader.classList.remove('loader-shown');

      e.target.reset();
      checkButtonStatus();
    }
  } catch (error) {
    console.log(error);
  }
});

loadMore.addEventListener('click', async () => {
  currentPage += 1;
  loader.classList.add('loader-shown');
  const data = await searchPhoto(currentQuery);

  try {
    renderPhoto(data);
    loader.classList.remove('loader-shown');

    const itemHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    const scrollHeightCorrected = itemHeight * 2;

    checkButtonStatus();
    window.scrollBy({
      top: scrollHeightCorrected,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  }
});

function searchPhoto(searchedImage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const PARAMS = `?key=42185111-4f5cd61d4ffab1c12875fcbb6&q=${searchedImage}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${defaultPageSize}`;
  const url = BASE_URL + PARAMS;

  return axios.get(url).then(res => {
    if (res.data.hits.length === 0) {
      throw new Error(res.status);
    } else {
      return res.data;
    }
  });
}

function checkButtonStatus() {
  const maxPage = Math.ceil(totalResult / defaultPageSize);

  if (maxPage <= currentPage) {
    loadMore.classList.add('hidden');
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      closeOnClick: true,
      closeOnEscape: true,
    });
  } else {
    loadMore.classList.remove('hidden');
  }
}

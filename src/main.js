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

// loader.style.display = 'none';

// searchForm.addEventListener('submit', e => {
//   e.preventDefault();

//   const name = e.target.elements.query.value;
//   loader.style.display = 'block';
//   searchPhoto(name)
//     .then(data => {
//       renderPhoto(data);
//     })
//     .finally(() => (loader.style.display = 'none'));

//   e.target.reset();
// });

// function searchPhoto(searchedImage) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const PARAMS = `?key=42185111-4f5cd61d4ffab1c12875fcbb6&q=${searchedImage}&image_type=photo&orientation=horizontal&safesearch=true`;
//   const url = BASE_URL + PARAMS;
//   // loader.style.display = 'inline-block';
//   return fetch(url).then(res => {
//     if (!res.ok) {
//       throw new Error(res.status);
//     } else {
//       return res.json();
//     }
//   });
// }

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

// photoContainer.addEventListener('load', () => {
//   loader.style.display = 'none';
// });

function renderPhoto(photo) {
  totalResult = photo.hits.length;
  if (photo.hits.length === 0) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      closeOnClick: true,
      closeOnEscape: true,
    });
    // loader.style.display = 'none';
  } else {
    const markup = photoTemplate(photo);
    // loader.style.display = 'inline-block';
    photoContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }
}

// ====================================================================

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  photoContainer.replaceChildren();
  currentQuery = e.target.elements.query.value;
  loader.style.display = 'block';
  searchPhoto(currentQuery)
    .then(data => {
      renderPhoto(data);
    })
    .finally(() => (loader.style.display = 'none'));

  e.target.reset();
  checkButtonStatus();
});

loadMore.addEventListener('click', () => {
  currentPage += 1;
  loader.style.display = 'block';
  searchPhoto(currentQuery)
    .then(data => {
      renderPhoto(data);
    })
    .finally(() => (loader.style.display = 'none'));
  checkButtonStatus();
});

function searchPhoto(searchedImage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const PARAMS = `?key=42185111-4f5cd61d4ffab1c12875fcbb6&q=${searchedImage}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${defaultPageSize}`;
  const url = BASE_URL + PARAMS;
  // loader.style.display = 'inline-block';

  return axios.get(url).then(res => res.data);
}

function checkButtonStatus() {
  // const maxPage = Math.ceil(totalResult / defaultPageSize);
  const maxPage = 2;
  if (currentPage === maxPage) {
    loadMore.classList.add('hidden');
    console.log('Yes, it is');
  } else {
    loadMore.classList.remove('hidden');
  }
}

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

const galleryList = document.querySelector('.gallery');

function createGalleryItem(item) {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = item.original;

  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = item.preview;
  galleryImage.alt = item.description;

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
}

function renderGallery() {
  const galleryFragment = document.createDocumentFragment();

  galleryItems.forEach(item => {
    const galleryItem = createGalleryItem(item);
    galleryFragment.appendChild(galleryItem);
  });

  galleryList.appendChild(galleryFragment);

  const lightbox = new SimpleLightbox('.gallery__item a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

document.addEventListener('DOMContentLoaded', renderGallery);

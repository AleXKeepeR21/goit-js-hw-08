import { galleryItems } from './gallery-items.js';
// Додатковий імпорт стилів

const galleryRef = document.querySelector('.gallery');

const galleryMarkup = createGalleryItemMarkup(galleryItems);
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryItemMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>
      `;
    })
    .join('');
}

galleryRef.addEventListener('click', onGalleryRefClick);

let modalWindow;
let onClickModalClose;

function onGalleryRefClick(event) {
  event.preventDefault();
  const isGalleryRef = event.target.classList.contains('gallery__image');
  if (!isGalleryRef) {
    return;
  }
  console.log(event.target);
  modalWindow = basicLightbox.create(
    ` <img src="${event.target.dataset.source}" > `,
    {
      onShow: () => {
        window.addEventListener('keydown', onEscapeClose);
      },
      onClose: () => {
        window.removeEventListener('keydown', onEscapeClose);
      },
    }
  );

  modalWindow.show(onClickModalClose);

  // window.addEventListener("keydown", onEscapeClose);
}

function onEscapeClose(event) {
  if (event.key === 'Escape') {
    modalWindow.close();
  }
}

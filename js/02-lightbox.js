import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryElement = document.querySelector(".gallery");

galleryElement.insertAdjacentHTML("beforeend", populateGallery(galleryItems));

const lightbox = new SimpleLightbox(".gallery a", {
  caption: true,
  captionsData: "alt",
	captionPosition: 'bottom',
  captionDelay: 250,
});

function populateGallery(imagesList) {
  return imagesList.map(galleryItemLayout).join("");
}

function galleryItemLayout({ preview, original, description }) {
  return `
		<li class="gallery__item">
		   <a class="gallery__link" href="${original}">
		      <img class="gallery__image" src="${preview}" alt="${description}" />
		   </a>
		</li>
	`;
}

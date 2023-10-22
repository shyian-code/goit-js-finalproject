import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const modalRef = {
  instance: null,
  image: null,
};

const galleryElement = document.querySelector(".gallery");

galleryElement.addEventListener("click", onGalleryClick);

galleryElement.insertAdjacentHTML("beforeend", populateGallery(galleryItems));

function populateGallery(imagesList) {
  return imagesList.map(galleryItemLayout).join("");
}

function galleryItemLayout({ preview, original, description }) {
  return `
		<li class="gallery__item">
		  <a class="gallery__link" href="${original}">
		    <img
		      class="gallery__image"
		      src="${preview}"
		      data-source="${original}"
		      alt="${description}"
		    />
		  </a>
		</li>
	`;
}

function onGalleryClick(e) {
  e.preventDefault();

  const target = e.target;
  const isGalleryImage = target.classList.contains("gallery__image");

  if (!isGalleryImage) return;

  showModal(target);
}

function showModal(element) {
  const src = element.dataset.source;
  if (!modalRef.image || !modalRef.instance) {
    createModalInstance(src);
  }
  modalRef.image.setAttribute("src", src);
  modalRef.instance.show();
}

function createModalInstance(src) {
  const options = {
    onShow: () => document.addEventListener("keydown", onModalClick),
    onClose: () => document.removeEventListener("keydown", onModalClick),
  };
  const content = modalImageLayout(src);
  const modalInstance = basicLightbox.create(content, options);

  modalRef.image = modalInstance.element().querySelector("img");
  modalRef.instance = modalInstance;
}

function modalImageLayout(src) {
  return `<img src="${src}" alt="modal" width="1200" height="800">`;
}

function onModalClick(e) {
  if (e.key === "Escape") {
    modalRef.instance?.close();
  }
}
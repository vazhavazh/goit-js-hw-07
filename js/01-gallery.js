import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

const createGalleryMarkup = galleryItems
  .map(
    ({
      preview,
      original,
      description,
    }) => `<a class="gallery__link" href="${original}"><img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    /></a>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", createGalleryMarkup);

gallery.addEventListener("click", openModel);

function openModel(event) {
  event.preventDefault();

  if (event.target.tagName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(`
        <img src="${event.target.getAttribute(
          "data-source"
        )}" width="800" height="600">
    `);
  instance.show();

  gallery.addEventListener("keydown", closeModalByEsc);
  function closeModalByEsc(event) {
    if (event.code === "Escape") {
      instance.close();
      gallery.removeEventListener("keydown", closeModalByEsc);
    }
  }
}

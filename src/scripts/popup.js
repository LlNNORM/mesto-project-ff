function openPopup(popupType) {
  popupType.classList.add("popup_is-opened");
  popupType.addEventListener("click", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}

function openImagePopup(target, title) {
  const imagePopup = document.querySelector(".popup_type_image");
  openPopup(imagePopup);
  const image = document.querySelector(".popup__image");
  const imageDescription = document.querySelector(".popup__caption");
  image.src = target.src;
  image.alt = target.alt;
  imageDescription.textContent = title;
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByCross(evt) {
  const openedPopup = evt.target.closest(".popup");
  closePopup(openedPopup);
}

function closePopupByEsc(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  evt.key === "Escape" ? closePopup(openedPopup) : undefined;
}

function closePopupByOverlay(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  evt.target === evt.currentTarget ? closePopup(openedPopup) : undefined;
}

export { openPopup, openImagePopup, closePopupByCross, closePopup };

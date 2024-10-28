function openPopup(popupType) {
  popupType.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
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
  evt.target === evt.currentTarget ? closePopup(evt.target) : undefined;
}

export { openPopup, closePopupByCross, closePopupByOverlay, closePopup };

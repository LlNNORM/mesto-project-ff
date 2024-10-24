import "../pages/index.css";
import initialCards from "./cards";
import { createCard, deleteCard, likeCard } from "./card";
import {
  openPopup,
  closePopupByCross,
  closePopupByOverlay,
  closePopup,
} from "./popup";
import { handleEditFormSubmit, handleAddFormSubmit } from "./form";

const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector(".popup_type_edit");
const placeAddPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const image = document.querySelector(".popup__image");
const imageDescription = document.querySelector(".popup__caption");
const profileEditFormElement = document.forms.editProfile;
const nameInput = profileEditFormElement.elements.name;
const jobInput = profileEditFormElement.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceFormElement = document.forms.newPlace;
const placeInput = newPlaceFormElement.elements.placeName;
const linkInput = newPlaceFormElement.elements.link;

renderCards({
  cardList: initialCards,
  cardsContainer,
  openImagePopup,
  positionBefore: false,
});
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", closePopupByOverlay);
});
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
});

placesAddButton.addEventListener("click", () => openPopup(placeAddPopup));
popupCloseButtons.forEach((button) =>
  button.addEventListener("click", closePopupByCross)
);

profileEditFormElement.addEventListener("submit", (evt) =>
  handleEditFormSubmit({
    evt,
    profileTitle,
    profileDescription,
    nameInput,
    jobInput,
    closePopup,
    profileEditPopup,
  })
);
newPlaceFormElement.addEventListener("submit", (evt) =>
  handleAddFormSubmit({
    evt,
    cardsContainer,
    newPlaceFormElement,
    placeInput,
    linkInput,
    renderCards,
    openImagePopup,
    closePopup,
    placeAddPopup,
  })
);

function renderCards(parametersObj) {
  const { cardList, cardsContainer, openImagePopup, positionBefore } =
    parametersObj;

  cardList.forEach((cardData) => {
    const card = createCard({ cardData, deleteCard, likeCard, openImagePopup });
    if (positionBefore) return cardsContainer.prepend(card);
    else return cardsContainer.append(card);
  });
}

function openImagePopup(link, title) {
  openPopup(imagePopup);
  image.src = link;
  image.alt = `${title} фото`;
  imageDescription.textContent = title;
}

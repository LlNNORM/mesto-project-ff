import "../pages/index.css";
import { createCard } from "./card";
import {
  openPopup,
  closePopupByCross,
  closePopupByOverlay,
  closePopup,
} from "./popup";
import {
  handleEditFormSubmit,
  handleAddFormSubmit,
  handleProfileImageEditFormSubmit,
} from "./form";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserData,
  getCardsData,
  deleteCard,
  updateUserData,
  postCardData,
  updateUserProfileImage,
  addLike,
  deleteLike,
} from "./api";

const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popups = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditFormElement = document.forms["edit-profile"];
const nameInput = profileEditFormElement.elements.name;
const jobInput = profileEditFormElement.elements.description;
const profileEditSaveButton = profileEditFormElement.elements["save-button"];
const profileImageEditPopup = document.querySelector(
  ".popup_type_edit-profile-image"
);
const profileImageEditFormElement = document.forms["edit-profile-photo"];
const profileImageLinkInput = profileImageEditFormElement.elements["link"];
const profileImage = document.querySelector(".profile__image");
const profileImageEditSaveButton =
  profileImageEditFormElement.elements["save-button"];
const placeAddPopup = document.querySelector(".popup_type_new-card");
const newPlaceFormElement = document.forms["new-place"];
const placeInput = newPlaceFormElement.elements["place-name"];
const linkInput = newPlaceFormElement.elements.link;
const newPlaceSaveButton = newPlaceFormElement.elements["save-button"];
const imagePopup = document.querySelector(".popup_type_image");
const image = document.querySelector(".popup__image");
const imageDescription = document.querySelector(".popup__caption");
const cardDeletePopup = document.querySelector(".popup_type_delete");
const confirmButton = cardDeletePopup.querySelector(
  ".popup__button_type_confirmation"
);
let userId;
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

Promise.all([getUserData(), getCardsData()])
  .then(([userData, cardsData]) => {
    profileImage.style = `background-image: url(${userData["avatar"]});`;
    profileTitle.textContent = userData["name"];
    profileDescription.textContent = userData["about"];
    userId = userData["_id"];
    renderCards({
      cardList: cardsData,
      cardsContainer,
      openImagePopup,
      positionBefore: false,
    });
  })
  .catch((err) => {
    console.log(err);
  });

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", closePopupByOverlay);
});

enableValidation(validationConfig);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileEditFormElement, validationConfig);
  openPopup(profileEditPopup);
});

profileImage.addEventListener("click", () => {
  profileImageEditFormElement.reset();
  clearValidation(profileImageEditFormElement, validationConfig);
  openPopup(profileImageEditPopup);
});

placesAddButton.addEventListener("click", () => {
  newPlaceFormElement.reset();
  clearValidation(newPlaceFormElement, validationConfig);
  openPopup(placeAddPopup);
});

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
    profileEditSaveButton,
    updateUserData,
  })
);

profileImageEditFormElement.addEventListener("submit", (evt) =>
  handleProfileImageEditFormSubmit({
    evt,
    profileImage,
    profileImageLinkInput,
    closePopup,
    profileImageEditPopup,
    profileImageEditSaveButton,
    updateUserProfileImage,
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
    newPlaceSaveButton,
    postCardData,
  })
);

confirmButton.addEventListener("click", () => {
  const deletedCardId = localStorage.getItem("deletedCardId");
  const deletedCard = document.querySelector(`[data-id="${deletedCardId}"]`);
  deleteCard(deletedCardId)
    .then(() => {
      deletedCard.remove();
      closePopup(cardDeletePopup);
    })
    .catch((err) => console.log(err));
});

function renderCards(parametersObj) {
  const { cardList, cardsContainer, openImagePopup, positionBefore } =
    parametersObj;

  cardList.forEach((cardData) => {
    const card = createCard({
      cardData,
      cardDeletePopup,
      openPopup,
      openImagePopup,
      userId,
      addLike,
      deleteLike,
    });
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

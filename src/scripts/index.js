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
import { enableValidation, hideInputError } from "./validation";
import {
  getUserData,
  getCardsData,
  likeCard,
  deleteCard,
  updateUserData,
  postCardData,
  updateUserProfileImage,
} from "./api";

const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
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

getCardsData().then((data) => {
  renderCards({
    cardList: data,
    cardsContainer,
    openImagePopup,
    positionBefore: false,
  });
});

getUserData().then((data) => {
  // profileImage.style = `background-image: url(${data["avatar"]});`;
  profileTitle.textContent = data["name"];
  profileDescription.textContent = data["about"];
  userId = data["_id"];
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", closePopupByOverlay);
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  [nameInput, jobInput].forEach((inputElement) => {
    hideInputError(profileEditFormElement, inputElement);
  });
  openPopup(profileEditPopup);
  enableValidation(profileEditFormElement);
});

profileImage.addEventListener("click", () => {
  profileImageEditFormElement.reset();
  hideInputError(profileImageEditFormElement, profileImageLinkInput);
  openPopup(profileImageEditPopup);
  enableValidation(profileImageEditFormElement);
});

placesAddButton.addEventListener("click", () => {
  newPlaceFormElement.reset();
  [placeInput, linkInput].forEach((inputElement) => {
    hideInputError(newPlaceFormElement, inputElement);
  });
  openPopup(placeAddPopup);
  enableValidation(newPlaceFormElement);
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
  deleteCard(deletedCardId);
  deletedCard.remove();
  closePopup(cardDeletePopup);
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
      likeCard,
      userId,
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

// async function renderProfileData() {
//   const profileData = await getUserData();
//   profileImage.style = `background-image: url(${profileData['avatar']});` ;
//   profileTitle.textContent= profileData['name'];
//   profileDescription.textContent=profileData['about']
// }
// // renderProfileData()

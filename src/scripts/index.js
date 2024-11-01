import "../pages/index.css";
import { createCard } from "./card";
import {
  openPopup,
  closePopupByCross,
  closePopupByOverlay,
  closePopup,
} from "./popup";
import { handleEditFormSubmit, handleAddFormSubmit } from "./form";
import { enableValidation, hideInputError } from "./validation";
import { getUserData, getCardsData, likeCard, deleteCard } from "./api";

const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector(".popup_type_edit");
const placeAddPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const cardDeletePopup = document.querySelector(".popup_type_delete");
const image = document.querySelector(".popup__image");
const imageDescription = document.querySelector(".popup__caption");
const profileEditFormElement = document.forms["edit-profile"];
const nameInput = profileEditFormElement.elements.name;
const jobInput = profileEditFormElement.elements.description;
const profileImage = document.querySelector(".profile__image");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
const newPlaceFormElement = document.forms["new-place"];
const placeInput = newPlaceFormElement.elements["place-name"];
const linkInput = newPlaceFormElement.elements.link;
const confirmationButtons = cardDeletePopup.querySelectorAll(
  ".popup__button_type_confirmation"
);
const [confirmButton, cancelButton] = confirmationButtons;
let userId;
let selectedCardId;

getCardsData().then((data) => {
  renderCards({
    cardList: data,
    cardsContainer,
    openImagePopup,
    positionBefore: false,
  });
});

getUserData().then((data) => {
  profileImage.style = `background-image: url(${data["avatar"]});`;
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

confirmButton.addEventListener("click", () => {
  const deletedCardId = localStorage.getItem("deletedCardId");
  const deletedCard = document.querySelector(`[data-id="${deletedCardId}"]`);
  deleteCard(deletedCardId);
  deletedCard.remove();
  closePopup(cardDeletePopup);
});
cancelButton.addEventListener("click", () => closePopup(cardDeletePopup));

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

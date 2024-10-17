import '../pages/index.css';
import initialCards from './cards'

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileEditPopup = document.querySelector(".popup_type_edit");
const placesAddPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");



initialCards.forEach((cardData)=> {
  const card = createCard(cardData, deleteCard, openPopup);
  return cardsContainer.append(card);
});

profileEditButton.addEventListener('click', (e) => { 
  openPopup(profileEditPopup);
});
placesAddButton.addEventListener('click', () => openPopup(placesAddPopup));
popupCloseButtons.forEach(button => button.addEventListener('click', (evt) => closePopupByCross(evt.target)));

function createCard(cardData, deleteCardFunction, openPopupFunction) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title")
  cardImage.src = cardData['link'];
  cardImage.alt = cardData['alt'];
  cardImage.addEventListener('click', () => openPopupFunction(imagePopup));
  cardTitle.textContent = cardData['name'];
  deleteButton.addEventListener("click", () => deleteCardFunction(card));
  return card
}

function deleteCard(card) {
  card.remove();
}

function openPopup(popupType) {
  popupType.classList.add('popup_is-opened');
  popupType.addEventListener('click', (evt)=> evt.target===evt.currentTarget ? closePopup(popupType): undefined);
  document.addEventListener('keydown', (evt)=>  {evt.key==='Escape' ? closePopup(popupType): undefined
    console.log('esc')
  }
  );
}

function closePopupByCross(crossButton) {
  crossButton.closest('.popup').classList.remove('popup_is-opened')
}

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopup);
}

const formElement = document.forms.editProfile
const nameInput = formElement.elements.name
const jobInput = formElement.elements.description
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

nameInput.value=profileTitle.textContent;
jobInput.value=profileDescription.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileDescription.textContent=jobInput.value;
    closePopup(profileEditPopup);
}

formElement.addEventListener('submit', handleFormSubmit); 
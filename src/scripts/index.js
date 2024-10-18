import '../pages/index.css';
import initialCards from './cards'

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector(".popup_type_edit");
const placeAddPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

renderCards(initialCards);

popups.forEach(popup => popup.classList.add('popup_is-animated'));

profileEditButton.addEventListener('click', () => openPopup(profileEditPopup));
placesAddButton.addEventListener('click', () => openPopup(placeAddPopup));
popupCloseButtons.forEach(button => button.addEventListener('click', closePopupByCross));

function renderCards (cardList) {
  cardList.forEach((cardData)=> {
    const card = createCard(cardData, deleteCard, likeCard, openImagePopup);
    return cardsContainer.append(card);
  });
}

function createCard(cardData, deleteCardFunction, likeCardFunction, openPopupFunction) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title")
  cardImage.src = cardData['link'];
  cardImage.alt = cardData['alt'];
  cardTitle.textContent = cardData['name'];
  cardImage.addEventListener('click', (evt) => openPopupFunction(evt.target, cardTitle.textContent));
  deleteButton.addEventListener("click", () => deleteCardFunction(card));
  likeButton.addEventListener("click", () => likeCardFunction(likeButton));
  return card
}

function deleteCard(card) {
  card.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
}

function openPopup(popupType) {
  popupType.classList.add('popup_is-opened');
  popupType.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

function openImagePopup(target, title) {
  openPopup(imagePopup);
  const image =  document.querySelector('.popup__image');
  const imageDescription =  document.querySelector('.popup__caption');
  image.src = target.src;
  image.alt = target.alt;
  imageDescription.textContent = title;
  
}

function closePopupByCross(evt) {
  evt.target.closest('.popup').classList.remove('popup_is-opened')
}

function closePopupByEsc(evt) {
  const openedPopup=document.querySelector('.popup_is-opened');
  evt.key==='Escape' ? closePopup(openedPopup): undefined
}

function closePopupByOverlay(evt) {
  const openedPopup=document.querySelector('.popup_is-opened');
  evt.target===evt.currentTarget ? closePopup(openedPopup): undefined
}

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

const profileEditFormElement = document.forms.editProfile
const nameInput = profileEditFormElement.elements.name
const jobInput = profileEditFormElement.elements.description
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

nameInput.value=profileTitle.textContent;
jobInput.value=profileDescription.textContent;

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileDescription.textContent=jobInput.value;
    closePopup(profileEditPopup);
}

profileEditFormElement.addEventListener('submit', handleEditFormSubmit); 



const newPlaceFormElement = document.forms.newPlace
const placeInput = newPlaceFormElement.elements.placeName
const linkInput = newPlaceFormElement.elements.link
let updatedCardList = initialCards;

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileDescription.textContent=jobInput.value;
    updatedCardList = [{ name: placeInput.value,
                        link: linkInput.value ,
                        alt:`${placeInput.value} фото`}, 
                        ...updatedCardList];
    cardsContainer.innerHTML='';
    renderCards(updatedCardList);
    placeInput.value = '';
    linkInput.value = '';
    closePopup(placeAddPopup);
}

newPlaceFormElement.addEventListener('submit', handleAddFormSubmit); 
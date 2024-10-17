import '../pages/index.css';
import initialCards from './cards'

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileEditPopup = document.querySelector(".popup_type_edit");
const placeAddPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

renderCards(initialCards);

profileEditButton.addEventListener('click', (e) => { 
  openPopup(profileEditPopup);
});
placesAddButton.addEventListener('click', () => openPopup(placeAddPopup));
popupCloseButtons.forEach(button => button.addEventListener('click', (evt) => closePopupByCross(evt.target)));

function renderCards (cardList) {
  cardList.forEach((cardData)=> {
    const card = createCard(cardData, deleteCard, openPopup);
    return cardsContainer.append(card);
  });
}

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
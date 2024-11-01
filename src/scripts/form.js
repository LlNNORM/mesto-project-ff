import { updateUserData, postCardData } from "./api";


function handleEditFormSubmit(parametersObj) {
  const {
    evt,
    profileTitle,
    profileDescription,
    nameInput,
    jobInput,
    closePopup,
    profileEditPopup,
  } = parametersObj;
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  updateUserData(nameInput, jobInput).then((data) => {
    profileTitle.textContent = data["name"];
    profileDescription.textContent = data["about"];
  });
  closePopup(profileEditPopup);
}

async function handleAddFormSubmit(parametersObj) {
  const {
    evt,
    cardsContainer,
    newPlaceFormElement,
    placeInput,
    linkInput,
    renderCards,
    openImagePopup,
    closePopup,
    placeAddPopup,
  } = parametersObj;
  evt.preventDefault();
  const newCard = await postCardData(placeInput, linkInput).then((data) => {
    const newCard = [
      {
        name: data["name"],
        link: data["link"],
      },
    ];
    return newCard;
  });
  
  renderCards({
    cardList: newCard,
    cardsContainer,
    openImagePopup,
    positionBefore: true,
  });
  newPlaceFormElement.reset();
  closePopup(placeAddPopup);
}

export { handleEditFormSubmit, handleAddFormSubmit };

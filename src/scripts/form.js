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
  closePopup(profileEditPopup);
}
function handleAddFormSubmit(parametersObj) {
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
  const newCard = [
    {
      name: placeInput.value,
      link: linkInput.value,
      alt: `${placeInput.value} фото`,
    },
  ];
  renderCards({
    cardList: newCard,
    cardsContainer,
    openImagePopup,
    positionBefore: true,
  });
  newPlaceFormElement.reset();
  closePopup(placeAddPopup);
}

export { handleEditFormSubmit, handleAddFormSubmit};

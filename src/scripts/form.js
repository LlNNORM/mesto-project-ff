function handleEditFormSubmit(
  evt,
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
  closePopup,
  profileEditPopup
) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEditPopup);
}
function handleAddFormSubmit(
  evt,
  cardsContainer,
  newPlaceFormElement,
  placeInput,
  linkInput,
  renderCards,
  openImagePopupFunction,
  closePopup,
  placeAddPopup
) {
  evt.preventDefault();
  const newCard = [
    {
      name: placeInput.value,
      link: linkInput.value,
      alt: `${placeInput.value} фото`,
    },
  ];
  renderCards(newCard, cardsContainer, openImagePopupFunction, true);
  newPlaceFormElement.reset();
  closePopup(placeAddPopup);
}

export { handleEditFormSubmit, handleAddFormSubmit };

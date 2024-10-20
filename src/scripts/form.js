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
  placeInput,
  linkInput,
  renderCards,
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
  renderCards(newCard, cardsContainer, true);
  placeInput.value = "";
  linkInput.value = "";
  closePopup(placeAddPopup);
}

export { handleEditFormSubmit, handleAddFormSubmit };

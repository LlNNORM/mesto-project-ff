function handleEditFormSubmit(parametersObj) {
  const {
    evt,
    profileTitle,
    profileDescription,
    nameInput,
    jobInput,
    closePopup,
    profileEditPopup,
    profileEditSaveButton,
    updateUserData,
  } = parametersObj;
  
  evt.preventDefault();
  showLoadingStatus(profileEditSaveButton, true);
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  updateUserData(nameInput, jobInput).then((data) => {
    profileTitle.textContent = data["name"];
    profileDescription.textContent = data["about"];
    showLoadingStatus(profileEditSaveButton, false);
  });
  closePopup(profileEditPopup);
}

function handleProfileImageEditFormSubmit(parametersObj) {
  const {
    evt,
    profileImage,
    profileImageLinkInput,
    closePopup,
    profileImageEditPopup,
    profileImageEditSaveButton,
    updateUserProfileImage,
  } = parametersObj;
  
  evt.preventDefault();
  showLoadingStatus(profileImageEditSaveButton, true);
  updateUserProfileImage(profileImageLinkInput).then((data) => {
    profileImage.style = `background-image: url(${data["avatar"]});`;
    showLoadingStatus(profileImageEditSaveButton, false);
    console.log(data);
  });
  closePopup(profileImageEditPopup);
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
    newPlaceSaveButton,
    postCardData,
  } = parametersObj;

  evt.preventDefault();
  showLoadingStatus(newPlaceSaveButton, true);

  const newCard = await postCardData(placeInput, linkInput).then((data) => {
    showLoadingStatus(newPlaceSaveButton, false);
    return data;
  });
  
  renderCards({
    cardList: [newCard],
    cardsContainer,
    openImagePopup,
    positionBefore: true,
  });
  newPlaceFormElement.reset();
  closePopup(placeAddPopup);
}

function showLoadingStatus(buttonElement, isLoading) {
  if (isLoading) {
    buttonElement.textContent="Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent="Сохранить";
    buttonElement.disabled = false;
  }
}

export { handleEditFormSubmit, handleAddFormSubmit, handleProfileImageEditFormSubmit };

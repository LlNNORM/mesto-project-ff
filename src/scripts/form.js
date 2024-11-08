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
  updateUserData(nameInput, jobInput)
    .then((data) => {
      profileTitle.textContent = data["name"];
      profileDescription.textContent = data["about"];
      closePopup(profileEditPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      showLoadingStatus(profileEditSaveButton, false);
    });
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
  updateUserProfileImage(profileImageLinkInput)
    .then((data) => {
      profileImage.style = `background-image: url(${data["avatar"]});`;
      closePopup(profileImageEditPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      showLoadingStatus(profileImageEditSaveButton, false);
    });
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
    newPlaceSaveButton,
    postCardData,
  } = parametersObj;

  evt.preventDefault();
  const originalText = newPlaceSaveButton.textContent;
  showLoadingStatus(newPlaceSaveButton, true);

  postCardData(placeInput, linkInput)
    .then((data) => {
      renderCards({
        cardList: [data],
        cardsContainer,
        openImagePopup,
        positionBefore: true,
      });
      newPlaceFormElement.reset();
      closePopup(placeAddPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      showLoadingStatus(newPlaceSaveButton, false, originalText);
    });;

  
}

function showLoadingStatus(buttonElement, isLoading, originalText='Сохранить') {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = originalText;
    buttonElement.disabled = false;
  }
}

export {
  handleEditFormSubmit,
  handleAddFormSubmit,
  handleProfileImageEditFormSubmit,
};

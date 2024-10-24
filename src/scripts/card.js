function createCard(parametersObj) {
  const { cardData, deleteCard, likeCard, openImagePopup } = parametersObj;
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  cardImage.src = cardData["link"];
  cardImage.alt = cardData["alt"];
  cardTitle.textContent = cardData["name"];
  cardImage.addEventListener("click", () =>
    openImagePopup(cardData["link"], cardTitle.textContent)
  );
  deleteButton.addEventListener("click", () => deleteCard(card));
  likeButton.addEventListener("click", () => likeCard(likeButton));
  return card;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };

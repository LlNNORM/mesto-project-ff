function createCard(parametersObj) {
  const { cardData, cardDeletePopup, openPopup, openImagePopup, likeCard, userId } = parametersObj;
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  
  const likeButton = card.querySelector(".card__like-button");
  let likeCounter = card.querySelector(".card__like-counter");
  const likeList = cardData["likes"] ? cardData["likes"]:[];
  let liked = isLiked(likeList, userId);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardId = cardData["_id"] ? cardData["_id"] : null;

  if (cardData["owner"]["_id"]===userId) {
    const deleteButton = card.querySelector(".card__delete-button");
    deleteButton.classList.add("card__delete-button-visible");
    deleteButton.addEventListener("click", () => openPopup(cardDeletePopup));
  }
  
  if (liked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  
  cardImage.src = cardData["link"];
  cardImage.alt = `${cardData["name"]} фото`;
  cardTitle.textContent = cardData["name"];
  likeCounter.textContent = cardData["likes"].length;
  cardImage.addEventListener("click", () =>
    openImagePopup(cardData["link"], cardTitle.textContent)
  );
  likeButton.addEventListener("click", () => likeCard({likeButton, likeCounter, cardId, liked}).then(res=> liked=res));
  return card;
}

function deleteCard(card) {
  card.remove();
}

function isLiked(likeList, userId) {
  return likeList.map(el=> el['_id']).includes(userId);
}

export { createCard };

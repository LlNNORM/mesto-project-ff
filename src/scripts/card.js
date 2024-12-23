function createCard(parametersObj) {
  const {
    cardData,
    cardDeletePopup,
    openPopup,
    openImagePopup,
    userId,
    addLike,
    deleteLike,
  } = parametersObj;
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");
  let likeCounter = card.querySelector(".card__like-counter");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeList = cardData["likes"];
  let liked = isLiked(likeList, userId);
  const cardId = cardData["_id"];
  const cardOwner = cardData["owner"]["_id"];
  card.dataset.id = cardId;

  showDeleteButton(cardOwner, userId, deleteButton);
  showLike(liked, likeButton);

  deleteButton.addEventListener("click", () => {
    openPopup(cardDeletePopup);
    localStorage.setItem("deletedCardId", cardId);
  });

  cardImage.src = cardData["link"];
  cardImage.alt = `${cardData["name"]} фото`;
  cardTitle.textContent = cardData["name"];
  likeCounter.textContent = cardData["likes"].length;
  cardImage.addEventListener("click", () =>
    openImagePopup(cardData["link"], cardTitle.textContent)
  );

  likeButton.addEventListener("click", () => {
    liked = likeCard({
      liked,
      cardId,
      likeButton,
      likeCounter,
      addLike,
      deleteLike,
    });
  });
  return card;
}

function showDeleteButton(cardOwner, userId, deleteButton) {
  if (cardOwner === userId) {
    deleteButton.classList.add("card__delete-button-visible");
  }
}

function isLiked(likeList, userId) {
  return likeList.map((el) => el["_id"]).includes(userId);
}

function showLike(liked, likeButton) {
  if (liked) {
    likeButton.classList.add("card__like-button_is-active");
  }
}

function likeCard(parametersObj) {
  const { cardId, likeButton, likeCounter, addLike, deleteLike } =
    parametersObj;
  let { liked } = parametersObj;
  if (!liked) {
    addLike(cardId)
      .then((res) => {
        likeCounter.textContent = res["likes"].length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    deleteLike(cardId)
      .then((res) => {
        likeCounter.textContent = res["likes"].length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
  return !liked;
}

export { createCard };

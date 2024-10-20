import { openImagePopup } from "./popup";

function renderCards(cardList, cardsContainer, positionBefore) {
  cardList.forEach((cardData) => {
    const card = createCard(cardData, deleteCard, likeCard, openImagePopup);
    if (positionBefore) return cardsContainer.prepend(card);
    else return cardsContainer.append(card);
  });
}

function createCard(
  cardData,
  deleteCardFunction,
  likeCardFunction,
  openPopupFunction
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  cardImage.src = cardData["link"];
  cardImage.alt = cardData["alt"];
  cardTitle.textContent = cardData["name"];
  cardImage.addEventListener("click", (evt) =>
    openPopupFunction(evt.target, cardTitle.textContent)
  );
  deleteButton.addEventListener("click", () => deleteCardFunction(card));
  likeButton.addEventListener("click", () => likeCardFunction(likeButton));
  return card;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { renderCards };

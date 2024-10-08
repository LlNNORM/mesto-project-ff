const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

initialCards.forEach((cardData)=> {
  const card = createCard(cardData, deleteCard);
  return cardsContainer.append(card);
});

function createCard(cardData, deleteFunction) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  card.querySelector(".card__image").src = cardData['link'];
  card.querySelector(".card__image").alt = cardData['alt'];
  card.querySelector(".card__title").textContent = cardData['name'];
  deleteButton.addEventListener("click", () => deleteFunction(card));
  return card
}

function deleteCard(card) {
  card.remove();
}

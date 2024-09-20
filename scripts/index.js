const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

initialCards.forEach(({ link, name }) => renderCard(link, name, deleteCard));

function renderCard(src, cardTitle, deleteFunction) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = src;
  cardElement.querySelector(".card__title").textContent = cardTitle;
  deleteButton.addEventListener("click", () => deleteFunction(deleteButton));

  return placesList.append(cardElement);
}

function deleteCard(deleteButton) {
  deleteButton.closest(".card").remove();
}

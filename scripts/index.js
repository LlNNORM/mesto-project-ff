// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');




{/* <template id="card-template">
  <li class="places__item card">
    <img class="card__image" src="" alt="" />
    <button type="button" class="card__delete-button"></button>
    <div class="card__description">
      <h2 class="card__title">
      </h2>
      <button type="button" class="card__like-button"></button>
    </div>
  </li>
</template> */}
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(imageSrc, cardTitle, deleteFunction) { 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = imageSrc;
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunction);

    return placesList.append(cardElement); 
}

// @todo: Функция удаления карточки
function deleteCard() { 
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunction);
}
// @todo: Вывести карточки на страницу
createCard('../images/waterfall.webp', 'Водопады Игуасу')

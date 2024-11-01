const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
    headers: {
      authorization: '0e54a225-fa4c-4f04-a036-c9ec4e520337',
      'Content-Type': 'application/json'
    }
  }

function getUserData() {
    return fetch(`${config['baseUrl']}/users/me`, {
      headers: config['headers'],
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }
  
function getCardsData() {
  return fetch(`${config['baseUrl']}/cards`, {
    headers: config['headers'],
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result)
      return result;
    });
}

function updateUserData(nameInput, jobInput) {
  return fetch(`${config['baseUrl']}/users/me`, {
    method: "PATCH",
    headers: config['headers'],
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function postCardData(placeInput, linkInput) {
    return fetch(`${config['baseUrl']}/cards`, {
        method: "POST",
        headers: config['headers'],
        body: JSON.stringify({
            name: placeInput.value,
            link: linkInput.value,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          return result;
        });
}

async function likeCard(parametersObj) {
  const {likeButton, likeCounter, cardId} = parametersObj;
  let {liked} = parametersObj;
  
  if (!liked) {
    likeCounter.textContent = await fetch(`${config['baseUrl']}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config['headers'],
    })
      .then((res) => res.json())
      .then((result) => {
        return result["likes"].length;
      });
      likeButton.classList.add("card__like-button_is-active");
      return !liked;
  } else {
    likeCounter.textContent = await fetch(`${config['baseUrl']}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config['headers'],
    })
      .then((res) => res.json())
      .then((result) => {
        return result["likes"].length;
      });
      likeButton.classList.remove("card__like-button_is-active");
      return !liked;
  }
  
}

function deleteCard(cardId) {
  fetch(`${config['baseUrl']}/cards/${cardId}`, {
    method: "DELETE",
    headers: config['headers'],
  })
}

export { getUserData, getCardsData, updateUserData, postCardData, likeCard, deleteCard };

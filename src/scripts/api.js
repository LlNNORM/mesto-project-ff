const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-25",
  headers: {
    authorization: "0e54a225-fa4c-4f04-a036-c9ec4e520337",
    "Content-Type": "application/json",
  },
};

function getUserData() {
  return fetch(`${config["baseUrl"]}/users/me`, {
    headers: config["headers"],
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      return result;
    })
    .catch((err) => console.log(err));
}

function getCardsData() {
  return fetch(`${config["baseUrl"]}/cards`, {
    headers: config["headers"],
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
}

function updateUserData(nameInput, jobInput) {
  return fetch(`${config["baseUrl"]}/users/me`, {
    method: "PATCH",
    headers: config["headers"],
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
}

function postCardData(placeInput, linkInput) {
  return fetch(`${config["baseUrl"]}/cards`, {
    method: "POST",
    headers: config["headers"],
    body: JSON.stringify({
      name: placeInput.value,
      link: linkInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
}

async function likeCard(parametersObj) {
  const { likeButton, likeCounter, cardId } = parametersObj;
  let { liked } = parametersObj;

  if (!liked) {
    likeCounter.textContent = await fetch(
      `${config["baseUrl"]}/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: config["headers"],
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res["likes"].length;
      })
      .catch((err) => console.log(err));
    likeButton.classList.add("card__like-button_is-active");
    return !liked;
  } else {
    likeCounter.textContent = await fetch(
      `${config["baseUrl"]}/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: config["headers"],
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res["likes"].length;
      })
      .catch((err) => console.log(err));
    likeButton.classList.remove("card__like-button_is-active");
    return !liked;
  }
}

function deleteCard(cardId) {
  fetch(`${config["baseUrl"]}/cards/${cardId}`, {
    method: "DELETE",
    headers: config["headers"],
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
}

function updateUserProfileImage(imageLinkInput) {
  return fetch(`${config["baseUrl"]}/users/me/avatar`, {
    method: "PATCH",
    headers: config["headers"],
    body: JSON.stringify({
      avatar: imageLinkInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
}

export {
  getUserData,
  getCardsData,
  updateUserData,
  postCardData,
  likeCard,
  deleteCard,
  updateUserProfileImage,
};

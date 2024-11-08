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
  }).then((res) => checkResponse(res));
}

function getCardsData() {
  return fetch(`${config["baseUrl"]}/cards`, {
    headers: config["headers"],
  }).then((res) => checkResponse(res));
}

function updateUserData(nameInput, jobInput) {
  return fetch(`${config["baseUrl"]}/users/me`, {
    method: "PATCH",
    headers: config["headers"],
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then((res) => checkResponse(res));
}

function postCardData(placeInput, linkInput) {
  return fetch(`${config["baseUrl"]}/cards`, {
    method: "POST",
    headers: config["headers"],
    body: JSON.stringify({
      name: placeInput.value,
      link: linkInput.value,
    }),
  }).then((res) => checkResponse(res));
}

function addLike(cardId) {
  return fetch(`${config["baseUrl"]}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config["headers"],
  }).then((res) => checkResponse(res));
}

function deleteLike(cardId) {
  return fetch(`${config["baseUrl"]}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config["headers"],
  }).then((res) => checkResponse(res));
}

function deleteCard(cardId) {
  return fetch(`${config["baseUrl"]}/cards/${cardId}`, {
    method: "DELETE",
    headers: config["headers"],
  }).then((res) => checkResponse(res));
}

function updateUserProfileImage(imageLinkInput) {
  return fetch(`${config["baseUrl"]}/users/me/avatar`, {
    method: "PATCH",
    headers: config["headers"],
    body: JSON.stringify({
      avatar: imageLinkInput.value,
    }),
  }).then((res) => checkResponse(res));
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export {
  getUserData,
  getCardsData,
  updateUserData,
  postCardData,
  deleteCard,
  updateUserProfileImage,
  addLike,
  deleteLike,
};

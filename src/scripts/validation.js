function enableValidation(validationConfig) {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = validationConfig;
  const formList = Array.from(document.querySelectorAll(`${formSelector}`));
  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(`${inputSelector}`)
    );
    const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  });
}

function clearValidation(formElement, validationConfig) {
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = validationConfig;
  const inputList = Array.from(
    formElement.querySelectorAll(`${inputSelector}`)
  );
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}

function isValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(`${inactiveButtonClass}`);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(`${inactiveButtonClass}`);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
}

function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = "";
}

export { enableValidation, clearValidation };

// {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }

// function enableValidation(formElement) {
//   const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
//   const buttonElement = formElement.querySelector(".popup__button");
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       isValid(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// }

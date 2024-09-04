const showInputError = (formProfile, popupText, errorMessage, settings) => {
  const errorElement = formProfile.querySelector(`.${popupText.id}-error`);
  popupText.classList.add("popup__input-error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (popupText, formProfile, settings) => {
  const errorElement = formProfile.querySelector(`.${popupText.id}-error`);
  popupText.classList.remove("popup__input-error");
  errorElement.classList.remove("popup__input-error_active");

  errorElement.textContent = "";
};

const checkInputValidity = (popupText, formProfile, settings) => {
  if (!popupText.validity.valid) {
    showInputError(
      popupText,
      formProfile,
      formProfile.validationMessage,
      settings
    );
  } else {
    hideInputError(popupText, formProfile, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupText) => {
    return !popupText.validity.valid;
  });
};

const toggleButtonState = (inputList, popupSaveButton, settings) => {
  console.log(popupSaveButton);
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    popupSaveButton.classList.add("button_inactive");
    popupSaveButton.disabled = true;
  } else {
    popupSaveButton.classList.remove("button_inactive");
    popupSaveButton.disabled = false;
  }
};

const setEventListeners = (popupText, inputList, settings) => {
  const formProfile = Array.from(
    popupText.querySelectorAll(settings.formProfile)
  );
  inputList.forEach((popupText) => {
    popupText.addEventListener("input", function () {
      checkInputValidity(popupText, formProfile, settings);
      const popupSubmit = formProfile.querySelector(".popup__submit-btn");
      toggleButtonState(inputList, popupSubmit, settings);
    });
  });
};

function enableValidation(settings) {
  const formProfile = Array.from(
    document.querySelectorAll(settings.formProfile)
  );
  formProfile.forEach((popupText) => {
    popupText.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const inputList = Array.from(popupText.querySelectorAll(".popup__text"));

    const popupSubmit = popupText.querySelector(".popup__submit-btn");
    toggleButtonState(inputList, popupSubmit, settings);

    setEventListeners(popupText, inputList, settings);
  });
}

enableValidation({
  formProfile: ".popup__input",
  popupText: ".popup__text",
  popupSaveButton: ".popup__submit-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

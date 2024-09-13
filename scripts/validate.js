const showInputError = (formProfile, popupText, errorMessage, settings) => {
  const errorElement = formProfile.parentNode.querySelector(
    `.${formProfile.id}-error`
  );
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
  if (hasInvalidInput(inputList)) {
    popupSaveButton.classList.add("button_inactive");
    popupSaveButton.disabled = true;
  } else {
    popupSaveButton.classList.remove("button_inactive");
    popupSaveButton.disabled = false;
  }
};

const setEventListeners = (formProfile, settings) => {
  const inputList = Array.from(formProfile.querySelectorAll(".popup__text"));
  const popupSubmit = formProfile.querySelector(".popup__submit-btn");
  toggleButtonState(inputList, popupSubmit, settings);
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

    setEventListeners(popupText, settings);
  });
}

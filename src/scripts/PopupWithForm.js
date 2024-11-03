import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector(".popup__form");

    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this._form.querySelector(".pop-up__save-button").textContent = "Guardar";
      this.close();
    });
  }

  //open(cardId) {
  //this._input.value = cardId;
  //super.open();
  // }

  close() {
    super.close();
    this._form.reset();
  }
}

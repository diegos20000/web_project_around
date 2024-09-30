import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, _handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = _handleFormSubmit;
    this._form = this._popup.querySelector(".popup__card");
    this._inputList = this._form.querySelector(".popup__input");
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
    this._form.addEventListener("popup__submit-btn", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
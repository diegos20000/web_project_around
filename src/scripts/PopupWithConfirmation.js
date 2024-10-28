import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._formProfile = this.Popup.querySelector(".popup__form");
  }

  open(handleDeleteSubmit) {
    super.open();
    this.handleDeleteSubmit = handleDeleteSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formProfile.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this.handleDeleteSubmit();
      this.close();
    });
  }
}

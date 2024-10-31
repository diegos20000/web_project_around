import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formProfile = this.popup.querySelector(".pop-up__save-button");
    this.handleDeleteSubmit = null;
  }

  open(handleDeleteSubmit) {
    super.open();
    this.handleDeleteSubmit = handleDeleteSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formProfile.addEventListener("click", (evt) => {
      evt.preventDefault();

      this.handleDeleteSubmit();
      this.close();
    });
  }
}

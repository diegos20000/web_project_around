import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.popupImage = this.popup.querySelector(".popup__large-image");

    this.popupCaption = this.popup.querySelector(".popup_title-img");
    this.closeButton = this.popup.querySelector(".pop-up__close-button");

    this.setEventListeners();
  }

  open(imageSrc, captionText) {
    this.popupImage.src = imageSrc;
    this.popupImage.alt = captionText;
    this.popupCaption.textContent = captionText;
    super.open();
  }

  close() {
    this.popupImage.src = "";
    this.popupImage.alt = "";
    this.popupCaption.textContent = "";
    super.close();
  }
}

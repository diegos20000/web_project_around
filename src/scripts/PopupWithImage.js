import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector("popup__image");
    this._popupCaption = this._popup.querySelector(".popup_title-img");
  }

  open(imageSrc, captionText) {
    this._popupImage.src = imageSrc;
    this._popupImage.alt = captionText;
    this._popupCaption.textContent = captionText;
    super.open();
  }
}

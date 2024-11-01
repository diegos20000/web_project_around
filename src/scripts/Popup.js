export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);

    this.closeButton = this.popup.querySelector(".pop-up__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    const openPopups = document.querySelectorAll(".pop-up.active");
    openPopups.forEach((popup) => {
      popup.classList.remove("active");
    });
    this.popup.classList.add("active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popup.classList.remove("active");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", () => {
      this.close();
    });

    this.popup.addEventListener("mousedown", (event) => {
      if (event.target === this.popup) {
        this.close();
      }
    });
  }
}

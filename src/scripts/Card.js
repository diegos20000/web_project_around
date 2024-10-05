const cardTemplate = document.querySelector("#card__template").content;

export default class Card {
  constructor(
    name,
    link,
    { handleClickImage, handleDeleteCard, handleAddLike, handleRemoveLike }
  ) {
    (this.name = name), (this.link = link);

    this._handleClickImage = handleClickImage;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }
  getTemplate() {
    return cardTemplate.querySelector(".element").cloneNode(true);
  }

  openModalCard() {
    openCard(this.name, this.link);
  }

  toggleLike() {
    this.cardLikeButton.classList.toggle("element__likes_active");
  }

  removeCard() {
    this.htmlCard.remove();
  }

  setEventListeners() {
    this.cardLikeButton.addEventListener("click", () => {
      this.toggleLike();
    });
    this.cardDeleteButton.addEventListener("click", () => {
      this.removeCard();
      this.cardImage.addEventListener("click", () => {
        this.handleClickImage();
      });
    });
  }

  setProperties() {
    this.htmlCard = this.getTemplate();
    this.cardImage = this.htmlCard.querySelector(".element__img");
    this.cardTitle = this.htmlCard.querySelector(".element__name");
    this.cardLikeButton = this.htmlCard.querySelector(".element__likes");
    this.cardDeleteButton = this.htmlCard.querySelector(".element__trash");
    this.cardTitle.textContent = this.name;
    this.cardImage.src = this.link;
  }

  getCard() {
    this.setProperties();
    this.setEventListeners();
    return this.htmlCard;
  }
}

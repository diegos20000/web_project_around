const cardTemplate = document.querySelector("#card__template").content;

export default class Card {
  constructor(
    name,
    link,
    user,
    cardId,

    { handleClickImage, handleDeleteCard, handleAddLike, handleRemoveLike }
  ) {
    (this.name = name), (this.link = link);
    this._user = user;
    this._handleClickImage = handleClickImage;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this.isLiked = false;
    this.likesCount = 0;
    this.cardId = cardId;
  }
  getTemplate() {
    return cardTemplate.querySelector(".element").cloneNode(true);
  }

  openModalCard() {
    this._handleClickImage(this.link, this.name);
  }

  toggleLike() {
    this.cardLikeButton.classList.toggle("element__likes_active");
  }

  updateLikesCount(count) {
    this.likesCount = count;
    this.counterLikes.textContent = this.likesCount;
  }

  removeCard() {
    this.htmlCard.remove();
  }

  setEventListeners() {
    this.cardLikeButton.addEventListener("click", () => {
      if (this.cardLikeButton.classList.contains("element__likes_active")) {
        this._handleRemoveLike(this.cardId).then((response) => {
          this.updateLikesCount(response.likes.length);
          this.toggleLike();
        });
      } else {
        this._handleAddLike(this.cardId).then((response) => {
          this.updateLikesCount(response.likes.length);
          this.toggleLike();
        });
      }
    });
    this.cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this.cardId, () => {
        this.removeCard();
      });
    });
    this.cardImage.addEventListener("click", () => {
      this.openModalCard();
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
    this.counterLikes = this.htmlCard.querySelector(".element__counter");
  }

  getCard() {
    this.setProperties();
    this.setEventListeners();
    return this.htmlCard;
  }

  createCard() {
    this._element = this.getTemplate();
    this.setEventListeners();

    this._element.querySelector(".element__img").src = this.src;
    this._element.querySelector(".element__img").alt = this.alt;
    this._element.querySelector(".element__name").textContent = this.text;

    const cardDeleteButton = this._element.querySelector(".element__trash");
    const cardLikeButton = this._element.querySelector(".element__likes");
    this.counterLikes = this._element.querySelector(".element__counter");

    if (this._user._id !== this.name.owner._id) {
      cardDeleteButton.remove();
    }

    if (this.name.likes.some((like) => like._id === this._user._id)) {
      this.cardLikeButton.classList.add("element__likes_active");
      const counter = this._element.querySelector(".element__counter");
      counter.textContent = this.name.likes.length;
    }

    return this._element;
  }
}

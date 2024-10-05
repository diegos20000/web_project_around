import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import {
  initialCards,
  openPopupCards,
  closeOnEsc,
  popupProfile,
  popupCards,
  popupImg,
} from "../scripts/utils.js";
import { enableValidation } from "../scripts/validate.js";
import "./index.css";
import Popup from "../scripts/Popup.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

const profileEditButton = document.querySelector(".group__button");
const profileNameNode = document.querySelector(".group__name");
const profileAboutNode = document.querySelector(".profile__exp");
const formProfile = document.querySelector(".popup__input");
const inputTitle = document.querySelector("#popup__input_name");
const inputAbout = document.querySelector("#popup__input_about");
const popupText = document.querySelector(".popup__text");

const inputNameNode = document.querySelector(".popup__text_title");
const inputAboutNode = document.querySelector(".popup__text_about");
const closeProfilePopupButton = document.querySelector(".popup__close");
const closeCardsPopupButton = document.querySelector("#close-popup-cards");
/*const popupProfile = document.querySelector(".popup");*/
/*const popupCards = document.querySelector("#popup__cards");
const popupImg = document.querySelector("#popup__image");*/

const closeTrash = document.querySelector(".element__trash");

const popupSaveButton = document.querySelector(".popup__submit-btn");

const profileButton = document.querySelector(".profile__addbutton");
const closeImgPopupButton = document.querySelector("#popup__close_img");
const formAddCards = document.querySelector("#form__profile");

const inputCardTitle = document.querySelector("#input__card_title");
const inputCardLink = document.querySelector("#input__card_link");

const submitPopup = document.querySelector("#card-submit-button");
const popupTitle = document.querySelector(".popup_input_title");
const popupUrl = document.querySelector(".popup_input_url");

/*const cardTemplate = document.querySelector("#card__template").content;*/
const cardArea = document.querySelector(".elements");

formAddCards.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newCard = createCard(inputCardTitle.value, inputCardLink.value, () => {
    popupImg.open(inputCardTitle.value, inputCardLink.value);
  });
  cardArea.prepend(newCard);
  popupProfile.classList.remove("active");
});

/*function createCard(name, link) {
  const element = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImg = element.querySelector(".element__img");
  const elementText = element.querySelector(".element__text");
  const elementLikes = element.querySelector(".element__likes");
  elementLikes.addEventListener("click", function () {
    elementLikes.classList.toggle("element__likes_active");
  });
  const elementTrash = element.querySelector(".element__trash_icon");
  elementTrash.addEventListener("click", function () {
    element.remove("active");
  });
  elementImg.addEventListener("click", function () {
    const popupImage = document.querySelector(".popup__image");
    const popupImageLarge = popupImage.querySelector(".popup__large-image");
    const popupImageTitle = popupImage.querySelector(".popup_title-img");
    popupImageLarge.src = link;
    popupImageTitle.textContent = name;
    popupImage.classList.add("active");
  });

  elementText.textContent = name;
  elementImg.src = link;
  elementImg.alt = name;
  return element;
}*/

initialCards.forEach(function (item) {
  cardList = new Section(item.Card, renderer.cardItem);
  const newCard = new Card(item.name, item.link, () => {
    popupImg.open(item.name, item.link);
  });
  cardArea.append(newCard.getCard());

  const cardElement = Card.createCard();
  cardList.addItem(cardElement);
});

formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputNameNode.value !== "" && inputAboutNode.value !== "") {
    profileNameNode.textContent = inputNameNode.value;
    profileAboutNode.textContent = inputAboutNode.value;
    popupSaveButton.classList.add("active");
    popupProfile.classList.remove("active");
  }
});

closeCardsPopupButton.addEventListener("click", function () {
  popupCards.classList.remove("active");
  document.removeEventListener("keydown", closeOnEsc);
});
profileButton.addEventListener("click", function () {
  popupCards.classList.add("active");
  submitPopup.classList.remove("active");
  document.addEventListener("keydown", closeOnEsc);
});

closeProfilePopupButton.addEventListener("click", function () {
  popupProfile.classList.remove("active");
  document.removeEventListener("keydown", closeOnEsc);
});
closeImgPopupButton.addEventListener("click", function () {
  popupImg.classList.remove("active");
  document.removeEventListener("keydown", closeOnEsc);
});
profileEditButton.addEventListener("click", function () {
  popupProfile.classList.add("active");
  inputNameNode.value = profileNameNode.textContent;
  inputAboutNode.value = profileAboutNode.textContent;
  popupSaveButton.classList.remove("active");
  document.addEventListener("keydown", closeOnEsc);
});

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("active")) {
    popupCards();
    popupProfile();
    popupImg();
  }
});

enableValidation({
  formProfile: ".popup__input",
  popupText: ".popup__text",
  popupSaveButton: ".popup__submit-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

const validationProfile = new FormValidator(FormElement, settings);
validationProfile.enableValidation();

const validationCardForm = new FormValidator(formAddCards, settings);
validationCardForm.enableValidation();

const popupImage = new PopupWithImage({
  popupSelector: popupImage,
});
popupImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileJob,
});
userInfo.setEventListeners();

const editProfile = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (inputValues) => {
    return api.createCard(inputValues.link, inputValues.title).then((Card) => {
      const newCardInstance = new Card(Card, "#card__template", currentUser, {
        handleCardClick: (src, text) =>
          popupImg.open({
            link: src,
            name: text,
          }),
      });

      const newcardElement = newCardInstance.createCard();

      cardContainer.prepend(newcardElement);
    });
  },
});

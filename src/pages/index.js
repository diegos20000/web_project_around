import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import {
  initialCards,
  closeOnEsc,
  popupProfile,
  popupCards,
  popupImg,
} from "../scripts/utils.js";
import "./index.css";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

const profileNameNode = document.querySelector(".group__name");
const profileAboutNode = document.querySelector(".profile__exp");
const formProfile = document.querySelector("#form-profile");
const inputNameNode = document.querySelector(".popup__text_title");
const inputAboutNode = document.querySelector(".popup__text_about");
const closeCardsPopupButton = document.querySelector("#close-popup-cards");
const popupSaveButton = document.querySelector(".popup__submit-btn");
const profileAddButton = document.querySelector(".profile__addbutton");
const formAddCards = document.querySelector("#form-cards");

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, {
        handleClickImage: () => {
          popupImg.open(item.name, item.link);
        },
      });
      cardSection.addItem(card.getCard());
    },
  },
  ".elements"
);

cardSection.renderItems();

const popupImage = new PopupWithImage(".popup__image");
popupImage.setEventListeners();

const addCardPopup = new PopupWithForm("#popup__cards", (inputValues) => {
  const newCardInstance = new Card(inputValues.name, inputValues.link, {
    handleCardClick: (src, text) =>
      popupImg.open({
        link: src,
        name: text,
      }),
  });

  const newcardElement = newCardInstance.getCard();
  cardSection.addItem(newcardElement);
});

const userInfo = new UserInfo({
  nameSelector: ".group__name",
  jobSelector: ".profile__exp",
});
addCardPopup.setEventListeners();

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
profileAddButton.addEventListener("click", function () {
  addCardPopup.open();
});

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("active")) {
    popupCards();
    popupProfile();
    popupImg();
  }
});

const settings = {
  formProfile: ".popup__form",
  popupText: ".popup__input",
  popupSaveButton: ".popup__submit-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const validationProfile = new FormValidator(formProfile, settings);
validationProfile.enableValidation();

const validationCardForm = new FormValidator(formAddCards, settings);
validationCardForm.enableValidation();

import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { initialCards, closeOnEsc } from "../scripts/utils.js";
import "./index.css";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Popup from "../scripts/Popup.js";

const profileName = document.querySelector(".group__name");
const popupEditName = document.querySelector(".group__button");
const popupAddCard = document.querySelector(".profile__addbutton");

const profileAbout = document.querySelector(".profile__exp");
const formProfile = document.querySelector("#form-profile");

const inputName = document.querySelector(".popup__text_title");
const inputAbout = document.querySelector(".popup__text_about");

const closeCardsPopupButton = document.querySelector("#close-popup-cards");
const popupSaveButton = document.querySelector(".popup__submit-btn");

const formAddCards = document.querySelector("#form-cards");

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, {
        handleClickImage: () => {
          popupImage.open(item.name, item.link);
        },
      });
      cardSection.addItem(card.getCard());
    },
  },
  ".elements"
);

cardSection.renderItems();

const profilePopup = new Popup("#popup__edit");
const cardsPopup = new Popup("#popup__cards");
const popupImage = new PopupWithImage("#popup__image");

profilePopup.setEventListeners();
cardsPopup.setEventListeners();
popupImage.setEventListeners();

document.querySelector(".group__button").addEventListener("click", () => {
  profilePopup.open();
});

document.querySelector(".profile__addbutton").addEventListener("click", () => {
  cardsPopup.open();
});

const addCardPopup = new PopupWithForm("#popup__cards", (inputValues) => {
  const newCardInstance = new Card(inputValues.title, inputValues.link, {
    handleClickImage: () => {
      popupImage.open(inputValues.link, inputValues.title);
    },
  });

  const newcardElement = newCardInstance.getCard();
  cardSection.addItem(newcardElement);
});
addCardPopup.setEventListeners();

/*formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputNameNode.value !== "" && inputAboutNode.value !== "") {
    profileNameNode.textContent = inputNameNode.value;
    profileAboutNode.textContent = inputAboutNode.value;
    popupSaveButton.classList.add("active");
    popupProfile.classList.remove("active");
  }
});*/

/*closeCardsPopupButton.addEventListener("click", function () {
  popupCards.classList.remove("active");
  document.removeEventListener("keydown", closeOnEsc);
});*/
/*profileAddButton.addEventListener("click", function () {
  addCardPopup.open();
});*/

/*document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("active")) {
    popupCards();
    popupProfile();
    popupImg();
  }
});*/

/*document.querySelector(".group__button").addEventListener("click", () => {
  popupEditName.open();
});

document.querySelector(".profile__addbutton").addEventListener("click", () => {
  popupSaveButton.open();
});*/

const editProfile = new PopupWithForm("#popup__edit", (inputValues) => {
  profileName.textContent = inputValues.name;
  profileAbout.textContent = inputValues.about;
});
editProfile.setEventListeners();

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  editProfile.open();
});

document.querySelector(".group__button").addEventListener("click", () => {
  const { nameSelector, jobSelector } = userInfo.getUserInfo();
  nameSelector.textContent = inputName.value;
  jobSelector.textContent = inputAbout.value;
  editProfile.open();
});

document.querySelector(".profile__addbutton").addEventListener("click", () => {
  addCardPopup.open();
});

const imageElements = document.querySelectorAll(".element__img");
imageElements.forEach((image) => {
  image.addEventListener("click", () => {
    const imageSrc = Image.src;
    const captionText = Image.alt;
    popupImage.open(imageSrc, captionText);
  });
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

const userInfo = new UserInfo({
  nameSelector: ".group__name",
  jobSelector: ".profile__exp",
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    profilePopup.close();
    cardsPopup.close();
    popupImage.close();
  }
});

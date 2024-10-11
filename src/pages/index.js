import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { initialCards } from "../scripts/utils.js";
import "./index.css";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

const formProfile = document.querySelector("#form-profile");

const inputName = document.querySelector(".popup__text_title");
const inputAbout = document.querySelector(".popup__text_about");

const formAddCards = document.querySelector("#form-cards");

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, {
        handleClickImage: () => {
          popupImage.open(item.link, item.name);
        },
      });
      cardSection.addItem(card.getCard());
    },
  },
  ".elements"
);

cardSection.renderItems();

const popupImage = new PopupWithImage("#popup__image");
popupImage.setEventListeners();

const editProfile = new PopupWithForm("#popup__edit", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    job: inputValues.about,
  });
});
editProfile.setEventListeners();

document.querySelector(".group__button").addEventListener("click", () => {
  userInfo.setUserInfo({
    name: inputName.value,
    about: inputAbout.value,
  });
  editProfile.open();
});

document.querySelector(".profile__addbutton").addEventListener("click", () => {
  addCardPopup.open();
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
    editProfile.close();
    addCardPopup.close();
    popupImage.close();
  }
});

import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";

import "./index.css";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import api from "../scripts/Api.js";
import PopupWithConfirmation from "../scripts/PopupWithConfirmation.js";
const formProfile = document.querySelector("#form-profile");

const inputName = document.querySelector(".popup__text_title");
const inputAbout = document.querySelector(".popup__text_about");
const buttonAddCard = document.querySelector(".profile__addbutton");
const formAddCards = document.querySelector("#form-cards");

const avatarImage = document.getElementById("profile__avatar_update");
const avatarNode = document.querySelector(".profile__img");

api.getInitialCards().then((cards) => {
  const cardSection = new Section(
    {
      items: cards,

      renderer: (item) => {
        const card = new Card(
          item.name,
          item.link,
          item.user,
          item._id,

          {
            handleClickImage: (link, name) => popupImage.open(link, name),

            handleDeleteCard: (cardId, callback) => {
              deleteForm.open(() => {
                api.deleteCard(cardId).then(() => {
                  callback();
                });
              });
            },
            handleAddLike: (cardId) => {
              return api.addCardLike(cardId);
            },

            handleRemoveLike: (cardId) => {
              return api.deleteCardLike(cardId);
            },
          }
        );
        cardSection.addItem(card.getCard());
      },
    },

    ".elements"
  );
  cardSection.renderItems();
});

const deleteForm = new PopupWithConfirmation("#popUp-Delete");
deleteForm.setEventListeners();

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
  const newCardInstance = new Card(
    inputValues.title,
    inputValues.link,
    inputValues.user,
    inputValues._id,
    {
      handleClickImage: () => {
        popupImage.open(inputValues.link, inputValues.title);
      },
      handleDeleteCard: (cardId, callback) => {
        deleteForm.open(() => {
          api.deleteCard(cardId).then(() => {
            callback();
          });
        });
      },
      handleAddLike: (cardId) => {
        return api.addCardLike(cardId);
      },

      handleRemoveLike: (cardId) => {
        return api.deleteCardLike(cardId);
      },
    }
  );

  const newcardElement = newCardInstance.getCard();
  cardSection.addItem(newcardElement);
  addCardPopup.close();
});
buttonAddCard.addEventListener("click", () => {
  validationCardForm.enableValidation(settings);
  addCardPopup.open();
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

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    avatarNode.src = userData.avatar;
  })
  .catch((error) => {
    console.error(error);
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    editProfile.close();
    addCardPopup.close();
    popupImage.close();
    deleteForm.close();
    avatarForm.close();
  }
});

const avatarForm = new PopupWithForm("#popUp-Avatar", (inputValues) => {
  api
    .updateAvatar(inputValues.link)
    .then((user) => {
      avatarNode.src = user.avatar;
      avatarForm.close();
    })
    .catch((err) => {
      console.error(err);
    });
});

avatarImage.addEventListener("click", () => {
  avatarForm.open();
});

avatarForm.setEventListeners();

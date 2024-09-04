const popupProfile = document.querySelector(".popup");
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
const popupImg = document.querySelector("#popup__image");
const closeTrash = document.querySelector(".element__trash");

const closeImgPopupButton = document.querySelector("#popup__close_img");

const popupSaveButton = document.querySelector(".popup__submit-btn");

const profileButton = document.querySelector(".profile__addbutton");
const popupCards = document.querySelector("#popup__cards");
const formAddCards = document.querySelector("#form__profile");

const inputCardTitle = document.querySelector("#input__card_title");
const inputCardLink = document.querySelector("#input__card_link");

const submitPopup = document.querySelector("#card-submit-button");
const popupTitle = document.querySelector(".popup_input_title");
const popupUrl = document.querySelector(".popup_input_url");

const cardTemplate = document.querySelector("#card__template").content;
const cardArea = document.querySelector(".elements");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function openPopupCards() {
  popupCards.classList.add("active");
  document.addEventListener("keydown", closeOnEsc);
}

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

formAddCards.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newCard = createCard(inputCardTitle.value, inputCardLink.value);
  cardArea.prepend(newCard);
  popupProfile.classList.remove("active");
});

function createCard(name, link) {
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
}

initialCards.forEach(function (item) {
  const newCard = createCard(item.name, item.link);
  cardArea.append(newCard);
});

profileEditButton.addEventListener("click", function () {
  popupProfile.classList.add("active");
  inputNameNode.value = profileNameNode.textContent;
  inputAboutNode.value = profileAboutNode.textContent;
  popupSaveButton.classList.remove("active");
  document.addEventListener("keydown", closeOnEsc);
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
function closeOnEsc(event) {
  if (event.key === "Escape") {
    popupCards.classList.remove("active");
    popupProfile.classList.remove("active");
    popupImg.classList.remove("active");
  }
}

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("active")) {
    popupCards();
    popupProfile();
    popupImg();
  }
});

const popupProfile = document.querySelector(".popup");
const profileEditButton = document.querySelector(".group__button");
const profileNameNode = document.querySelector(".group__name");
const profileAboutNode = document.querySelector(".profile__exp");

const formProfile = document.querySelector(".popup__input");
const inputNameNode = formProfile.querySelector(".popup__text_title");
const inputAboutNode = formProfile.querySelector(".popup__text_about");

const closeProfilePopupButton = popupProfile.querySelector(".popup__close");
const popupSaveButton = formProfile.querySelector(".popup__submit-btn");

const cardTemplate = document.querySelector("#card__template").content;
const elements = document.querySelector(".elements");

const profileButton = document.querySelector(".popup__addprofile");
const profileAddButton = document.querySelector(".profile__addbutton");
const formInputProfile = document.querySelector(".popup__input-profile");
const inputName = formInputProfile.querySelector(".popup__profile_text");
const inputAbout = formInputProfile.querySelector(".popup__profile_about");

const closeProfilePopup = profileButton.querySelector(".popup__close-profile");
const popupSave = formInputProfile.querySelector(".popup__submit");

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

profileAddButton.addEventListener("click", function () {
  profileButton.classList.add("active");
  inputName.value = formProfile.textContent;
  inputAbout.value = formProfile.textContent;
  popupSave.classList.remove("active");
});

function createElements(title, link) {
  const elements = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImg = elements.querySelector(".element__img");
  const elementName = elements.querySelector(".element__name");
  elementName.textContent = title;
  elementImg.src = link;
  elementImg.addEventListener("click", function () {});
  cardArea.append(elements);
}
closeProfilePopup.addEventListener("click", function () {
  profileButton.classList.remove("active");
  popupSave.classList.remove("active");
});

profileEditButton.addEventListener("click", function () {
  popupProfile.classList.add("active");
  inputNameNode.value = profileNameNode.textContent;
  inputAboutNode.value = profileAboutNode.textContent;
  popupSaveButton.classList.remove("active");
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

closeProfilePopupButton.addEventListener("click", function () {
  popupProfile.classList.remove("active");
  popupSaveButton.classList.remove("active");
});

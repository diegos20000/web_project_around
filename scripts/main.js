let popupProfile = document.querySelector(".popup");
let profileEditButton = document.querySelector(".group__button");
let profileNameNode = document.querySelector(".group__name");
let profileAboutNode = document.querySelector(".profile__exp");
let formProfile = document.querySelector(".popup__input");
let inputNameNode = formProfile.querySelector(".popup__text_title");
let inputAboutNode = formProfile.querySelector(".popup__text-about");
let closeProfilePopupButton = popupProfile.querySelector(".popup__close");
let popupSaveButton = formProfile.querySelector(".popup__submit-btn");

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

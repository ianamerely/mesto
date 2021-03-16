const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypePlace = document.querySelector('.popup_type_place');
const popupTypePicture = document.querySelector('.popup_type_picture');
const formProfile = popupTypeProfile.querySelector('.popup__container');
const formPlace = popupTypePlace.querySelector('.popup__container');
const popupTypeProfileCloseButton = popupTypeProfile.querySelector('.popup__close-button');
const popupTypePlaceCloseButton = popupTypePlace.querySelector('.popup__close-button');
const popupTypePictureCloseButton = popupTypePicture.querySelector('.popup__close-button');
const formProfileOpenButton = document.querySelector('.profile__edit-button');
const formPlaceOpenButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const placeNameInput = popupTypePlace.querySelector('.popup__input_type_place-name');
const placeLinkInput = popupTypePlace.querySelector('.popup__input_type_place-link');
const popupPicture = document.querySelector('.popup__picture');
const popupSubtitle = document.querySelector('.popup__subtitle');
const elementsContainer = document.querySelector('.elements');
const popupTypePlaceSaveButton = popupTypePlace.querySelector('.popup__save-button') 

/* const inputList = document.querySelectorAll('.popup__input'); */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://images.unsplash.com/photo-1566492885978-1d1cd6998fbc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const validationSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}; 


import Card from './card.js'
import FormValidator from './formValidator.js'

const popupTypeProfileFormValidator = new FormValidator(validationSettings, popupTypeProfile)
const popupTypePlaceFormValidator = new FormValidator(validationSettings, popupTypePlace)

/* popupTypeProfileFormValidator.enableValidation()
popupTypePlaceFormValidator.enableValidation()
 */




const getItem = () => {
  initialCards.forEach((item) => {
    const card = new Card (item, '.template', openPopupTypePicture)
    const cardElement = card.generateCard();
    elementsContainer.append(cardElement);
  });
};



function openPopup(item){
  item.classList.toggle('popup_opened');
  item.tabIndex = -1;
  item.addEventListener('click', closeViaOverlay);
  document.addEventListener('keydown', closeViaEsc);
 /*  popupTypeProfileFormValidator.enableValidation()
  popupTypePlaceFormValidator.enableValidation()
  popupTypeProfileFormValidator.resetErrors()
  popupTypePlaceFormValidator.resetErrors() */
/*   popupTypePlaceFormValidator.deleteInputFieldsErrors(inputList)
  popupTypeProfileFormValidator.deleteInputFieldsErrors(inputList) */
}

function closePopup(item){
  item.classList.remove('popup_opened');
  item.removeEventListener('click', closeViaOverlay); 
  document.removeEventListener('keydown', closeViaEsc);
}

function openPopupTypePicture(name, link){
  openPopup(popupTypePicture);
  popupPicture.src = link; 
  popupPicture.alt = name; 
  popupSubtitle.textContent = name;
}

function handleProfileSubmit(evt){ 
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value; 
  profileSubtitle.textContent = jobInput.value; 
  closePopup(popupTypeProfile);
}

function handlePlaceSubmit(evt){ 
  evt.preventDefault(); 
  const placeTitle = placeNameInput.value; 
  const placeLink = placeLinkInput.value; 
  const placeItem = new Card({name:placeTitle, link:placeLink}, '.template', openPopupTypePicture); 
  const newItem = placeItem.generateCard()
  elementsContainer.prepend(newItem); 
  closePopup(popupTypePlace); 
} 

  const closeViaOverlay = (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(evt.target)
      };
  }

  const closeViaEsc = (evt) => {
    if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
    };
}

 formPlaceOpenButton.addEventListener('click', () => {
  openPopup(popupTypePlace); 
  placeNameInput.value = ""; 
  placeLinkInput.value = "";
  popupTypePlaceSaveButton.classList.add('popup__save-button_disabled');
  popupTypePlaceSaveButton.setAttribute('disabled', true);
  popupTypePlaceFormValidator.enableValidation()
});  

formProfileOpenButton.addEventListener('click', () => {
  openPopup(popupTypeProfile);
  nameInput.value= profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupTypeProfileFormValidator.enableValidation()

})

popupTypeProfileCloseButton.addEventListener('click', () => {closePopup(popupTypeProfile)});
popupTypePlaceCloseButton.addEventListener('click', () => {closePopup(popupTypePlace)})
popupTypePictureCloseButton.addEventListener('click', () => {closePopup(popupTypePicture)});
formProfile.addEventListener('submit', handleProfileSubmit); 
formPlace.addEventListener('submit', handlePlaceSubmit); 

getItem()
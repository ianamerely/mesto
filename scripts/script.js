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
const templateElement = document.querySelector('.template');
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

function getItem(item){ 
  const newItem = templateElement.content.cloneNode(true); 
  const itemTitle = newItem.querySelector('.element__name'); 
  const itemPicture = newItem.querySelector('.element__pic'); 
  itemTitle.textContent = item.name; 
  itemPicture.src = item.link; 
  itemPicture.alt= item.name; 
  const elementDeliteButton = newItem.querySelector('.element__delite-button'); 
  elementDeliteButton.addEventListener('click', handleDeleteCard); 
  const elementLikeButton = newItem.querySelector('.element__heart-icon'); 
  elementLikeButton.addEventListener('click',  handleLikeIcon); 
  itemPicture.addEventListener('click', () => openPopupTypePicture(item));
  return newItem; 
} 

function render() { 
  const html = initialCards 
  .map(getItem) 
  elementsContainer.append(...html); 
} 

function handleDeleteCard(event){ 
  event.target.closest('.element').remove(); 
} 

function handleLikeIcon(event){ 
  event.target.classList.toggle('element__heart-icon_liked')
} 

function openPopup(item){
  item.classList.toggle('popup_opened');
  item.tabIndex = -1
  const openedPopup = document.querySelector('.popup_opened')
  openedPopup.addEventListener('click', closeViaOverlay);
  document.addEventListener('keydown', closeViaEsc)
}

function closePopup(item){
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeViaEsc)
}

function openPopupTypePicture(item){
  openPopup(popupTypePicture);
  popupPicture.src = item.link; 
  popupPicture.alt = item.name; 
  popupSubtitle.textContent = item.name;
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
  const placeItem = getItem({name: placeTitle , link: placeLink}); 
  elementsContainer.prepend(placeItem); 
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
  const popupTypePlaceSaveButton = popupTypePlace.querySelector('.popup__save-button')
  popupTypePlaceSaveButton.classList.add('popup__save-button_disabled')
  popupTypePlaceSaveButton.setAttribute('disabled', true);
});  

formProfileOpenButton.addEventListener('click', () => {
  openPopup(popupTypeProfile);
  nameInput.value= profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
})

popupTypeProfileCloseButton.addEventListener('click', () => {closePopup(popupTypeProfile);});
popupTypePlaceCloseButton.addEventListener('click', () => {closePopup(popupTypePlace);});

popupTypePictureCloseButton.addEventListener('click', () => closePopup(popupTypePicture));
formProfile.addEventListener('submit', handleProfileSubmit); 
formPlace.addEventListener('submit', handlePlaceSubmit); 

render()
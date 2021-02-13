let profilePopup = document.querySelector('.profile-popup')
let profileOpenButton = document.querySelector('.profile__edit-button')
let profileCloseButton = profilePopup.querySelector('.popup__close-button')
let nameInput = profilePopup.querySelector('.popup__input_type_name');
let jobInput = profilePopup.querySelector('.popup__input_type_job');
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let formProfile = profilePopup.querySelector('.popup__container');

let placePopup = document.querySelector('.place-popup')
let placeOpenButton = document.querySelector('.profile__add-button')
let placeCloseButton = placePopup.querySelector('.popup__close-button')
let placeNameInput = placePopup.querySelector('.popup__input_type_place-name');
let placeLinkInput = placePopup.querySelector('.popup__input_type_place-link');
let formPlace = placePopup.querySelector('.popup__container');

let addClassProfile = function(){
  profilePopup.classList.add('popup_opened');
  nameInput.value= profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
}
let removeClassProfile = function(){
  profilePopup.classList.remove('popup_opened');
}
 
let addClassPlace = function(){
  placePopup.classList.add('popup_opened');
}
let removeClassPlace = function(){
  placePopup.classList.remove('popup_opened');
}
 

function closeViaOverlay(evt){
  if (evt.target === evt.currentTarget){
   removeClassProfile()
   removeClassPlace()
  }
}

profilePopup.addEventListener('click', closeViaOverlay)
placePopup.addEventListener('click', closeViaOverlay)


function profileSubmitHandler (evt){
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    removeClassProfile();
  }

function placeSubmitHandler(evt){
    evt.preventDefault();
    const placeTitle = placeNameInput.value;
    const placeLink = placeLinkInput.value;
    const placeItem = getItem({name: placeTitle , link: placeLink});
    elementsContainer.prepend(placeItem);
    removeClassPlace();
    placeNameInput.value = "";
    placeLinkInput.value = "";
  }


profileOpenButton.addEventListener('click', addClassProfile)
profileCloseButton.addEventListener('click', removeClassProfile)
formProfile.addEventListener('submit', profileSubmitHandler); 

placeOpenButton.addEventListener('click', addClassPlace);
placeCloseButton.addEventListener('click', removeClassPlace);
formPlace.addEventListener('submit', placeSubmitHandler)


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
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


const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template');
function getItem(item){
  const newItem = templateElement.content.cloneNode(true);
  const itemTitle = newItem.querySelector('.element__name');
  const itemPicture = newItem.querySelector('.element__pic');
  itemTitle.textContent = item.name;
  itemPicture.src = item.link;
  return newItem;
}

function render() {
  const html = initialCards
  .map(getItem)
  elementsContainer.append(...html);
}
render();



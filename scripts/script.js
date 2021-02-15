const profilePopup = document.querySelector('.popup_type_profile')
const profileOpenButton = document.querySelector('.profile__edit-button')
const profileCloseButton = profilePopup.querySelector('.popup__close-button')
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const formProfile = profilePopup.querySelector('.popup__container');

const placePopup = document.querySelector('.popup_type_place')
const placeOpenButton = document.querySelector('.profile__add-button')
const placeCloseButton = placePopup.querySelector('.popup__close-button')
const placeNameInput = placePopup.querySelector('.popup__input_type_place-name');
const placeLinkInput = placePopup.querySelector('.popup__input_type_place-link');
const formPlace = placePopup.querySelector('.popup__container');

const picturePopup = document.querySelector('.popup_type_picture');
const picturePopupPic = document.querySelector('.popup__picture');
const picturePopupSubtitle = document.querySelector('.popup__subtitle');
const picturePopupCloseButton = picturePopup.querySelector('.popup__close-button');





function deliteElementHandler(event){
  const targetEl = event.target;
  const targetItem = targetEl.closest('.element');
  targetItem.remove();
}

function likeElementHandler(event){
  const targetEl = event.target;
  const targetItem = targetEl.closest('.element__heart-icon');
  targetItem.classList.add('element__heart-icon_liked')
}

const addClassProfile = function(){
  profilePopup.classList.add('popup_opened');
  nameInput.value= profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
}
const removeClassProfile = function(){
  profilePopup.classList.remove('popup_opened');
}
 
const addClassPlace = function(){
  placePopup.classList.add('popup_opened');
}
const removeClassPlace = function(){
  placePopup.classList.remove('popup_opened');
}

const removeClassPicture = function(){
  picturePopup.classList.remove('popup_opened');
}

picturePopupCloseButton.addEventListener('click', removeClassPicture)

function closeViaOverlay(evt){
  if (evt.target === evt.currentTarget){
   removeClassProfile()
   removeClassPlace()
  }
}

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

profilePopup.addEventListener('click', closeViaOverlay)
profileOpenButton.addEventListener('click', addClassProfile)
profileCloseButton.addEventListener('click', removeClassProfile)
formProfile.addEventListener('submit', profileSubmitHandler); 

placeOpenButton.addEventListener('click', addClassPlace);
placeCloseButton.addEventListener('click', removeClassPlace);
formPlace.addEventListener('submit', placeSubmitHandler)
placePopup.addEventListener('click', closeViaOverlay)
  


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


const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template');

function getItem(item){
  const newItem = templateElement.content.cloneNode(true);
  const itemTitle = newItem.querySelector('.element__name');
  const itemPicture = newItem.querySelector('.element__pic');
  itemTitle.textContent = item.name;
  itemPicture.src = item.link;
  itemPicture.alt= item.name;
  const deliteElementButton = newItem.querySelector('.element__delite-button');
  deliteElementButton.addEventListener('click', deliteElementHandler);
  const likeElementButton = newItem.querySelector('.element__heart-icon');
  likeElementButton.addEventListener('click', likeElementHandler);
  itemPicture.addEventListener('click', openPicturePopub);
  picturePopupPic.src = item.link;
  picturePopupSubtitle.textContent = item.name;

  function openPicturePopub(event){
  const picturePopup = document.querySelector('.popup_type_picture');
  const picturePopupPic = document.querySelector('.popup__picture');
  const picturePopupSubtitle = document.querySelector('.popup__subtitle');
    const targetEl = event.target;
    const targetItem = targetEl.closest('.element__pic');
    picturePopup.classList.add('popup_opened');
    picturePopupPic.src = item.link;
    picturePopupPic.alt = item.name;
    picturePopupSubtitle.textContent = item.name
    picturePopupSubtitle.textContent = item.name;
    item.link = targetItem.src
   }
  return newItem;
}

function render() {
  const html = initialCards
  .map(getItem)
  elementsContainer.append(...html);
}
render()

const popup = document.querySelector('.popup')
const popupOpenButton = document.querySelector('.profile__edit-button')
const popupCloseButton = popup.querySelector('.popup__close-button')
let nameInput = popup.querySelector('.popup__name-input');
let jobInput = popup.querySelector('.popup__job-input');
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')

const addClassPopup = function(){
  popup.classList.add('popup_opened');
  nameInput.value= profileTitle.innerText
  jobInput.value = profileSubtitle.innerText
}

popupOpenButton.addEventListener('click', addClassPopup)

const removeClassPopup = function(){
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', removeClassPopup)
 
function closeViaOverlay(evt){
  if (evt.target === evt.currentTarget){
   removeClassPopup()
  }
}
popup.addEventListener('click', closeViaOverlay)

//пока все ок


let form = popup.querySelector('.popup__container');
let formSave = popup.querySelector('.popup__save-button');


function formSubmitHandler (evt){
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    removeClassPopup();
  }

  form.addEventListener('submit', formSubmitHandler); 




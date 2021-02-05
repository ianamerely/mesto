let popup = document.querySelector('.popup')
let popupOpenButton = document.querySelector('.profile__edit-button')
let popupCloseButton = popup.querySelector('.popup__close-button')
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let form = popup.querySelector('.popup__container');
let addClassPopup = function(){
  popup.classList.add('popup_opened');
  nameInput.value= profileTitle.innerText
  jobInput.value = profileSubtitle.innerText
}
let removeClassPopup = function(){
  popup.classList.remove('popup_opened');
}
 
function closeViaOverlay(evt){
  if (evt.target === evt.currentTarget){
   removeClassPopup()
  }
}
popup.addEventListener('click', closeViaOverlay)


function formSubmitHandler (evt){
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    removeClassPopup();
  }

popupOpenButton.addEventListener('click', addClassPopup)
popupCloseButton.addEventListener('click', removeClassPopup)
form.addEventListener('submit', formSubmitHandler); 




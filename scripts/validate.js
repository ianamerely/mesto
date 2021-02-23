const validationSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  submitButtonErrorSelector: 'popup__save-button_disabled',
  inactiveButtonClass: '.popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}; 


 hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) =>{
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) =>{
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__save-button_disabled')
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove('popup__save-button_disabled')
    buttonElement.removeAttribute('disabled', true)
  }
}

const showInputError = (formElement, inputElement, errorMessage)=>{
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible')
  inputElement.classList.add('popup__input_type_error');
  
}

const hideInputError =(formElement, inputElement)=>{
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_visible');
  inputElement.classList.remove('popup__input_type_error');
}


 
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
  setEventListeners(formElement)
  });
}

/*const checkInputValidity = (formElement, inputElement) => {
  /*const isInputElementNotValid = !inputElement.validity.valid;*/
  /*if (isInputElementNotValid){
    const errorMessage = inputElement.validationMessage
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }*/
  /*if (! inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}*/


enableValidation()
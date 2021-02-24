const validationSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}; 


hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) =>{
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, object) =>{
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(object.inactiveButtonClass)
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass)
    buttonElement.removeAttribute('disabled', true)
  }
}

const showInputError = (formElement, inputElement, errorMessage, object)=>{
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass)
  inputElement.classList.add(object.inputErrorClass);
  
}

const hideInputError =(formElement, inputElement, object)=>{
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = '';
  errorElement.classList.remove(object.errorClass)
  inputElement.classList.remove(object.inputErrorClass);
}


 
const checkInputValidity = (formElement, inputElement, object) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
  }
};

const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, object);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
}

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  setEventListeners(formElement, object)
  });
}

enableValidation(validationSettings)
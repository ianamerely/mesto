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

const toggleButtonState = (inputList, buttonElement, validationSettings) =>{
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(validationSettings.inactiveButtonClass)
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass)
    buttonElement.removeAttribute('disabled', true)
  }
}

const showInputError = (formElement, inputElement, errorMessage, validationSettings)=>{
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass)
  inputElement.classList.add(validationSettings.inputErrorClass);
  
}

const hideInputError =(formElement, inputElement, validationSettings)=>{
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = '';
  errorElement.classList.remove(validationSettings.errorClass)
  inputElement.classList.remove(validationSettings.inputErrorClass);
}


 
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  setEventListeners(formElement, validationSettings)
  });
}

enableValidation(validationSettings)
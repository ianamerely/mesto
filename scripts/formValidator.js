export default class FormValidator{

  constructor(data, form){
  this._formSelector = data.formSelector
  this._inputSelector = data.inputSelector
  this._submitButtonSelector = data.submitButtonSelector
  this._inactiveButtonClass = data.inactiveButtonClass
  this._inputErrorClass = data.inputErrorClass
  this._errorClass = data.inputErrorClass
  this._form = form
  }

_showInputError(inputElement, errorMessage){
  const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass)
  inputElement.classList.add(this._inputErrorClass);
}

_hideInputError(inputElement){
  const errorElement =  this._form.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = '';
  errorElement.classList.remove(this._errorClass)
  inputElement.classList.remove(this._inputErrorClass);
}

_setEventListeners() {
  this._form.addEventListener('submit', (event) => {
    event.preventDefault()
  });
  const inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
  const buttonElement = this._form.querySelector(this._submitButtonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement)
      this._toggleButtonState(inputList, buttonElement)
    })
  })
}

_hasInvalidInput(inputList){
  return inputList.some((inputElement) =>{
    return !inputElement.validity.valid;
  })
}

_toggleButtonState(inputElement, buttonElement){
  if (!inputElement.validity.valid){
    buttonElement.classList.add(this._inactiveButtonClass)
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass)
    buttonElement.removeAttribute('disabled', true)
  }
}

_checkInputValidity(inputElement){
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
}


enableValidation (){
  const formList = Array.from(document.querySelectorAll(this._formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
 this._setEventListeners()
  });
}




}







  
  
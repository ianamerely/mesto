export default class Card{

constructor(data, cardSelector, openPopupTypePicture){
  this._cardSelector = cardSelector
  this._cardName = data.name
  this._cardLink = data.link
  this._openPopupTypePicture = openPopupTypePicture
}

_getTemplate() {
  const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
  return cardElement;
}


_handleDeleteCard(){ 
  this._element.remove(); 
} 

_handleLikeIcon(){ 
  this._element.querySelector('.element__heart-icon').classList.toggle('element__heart-icon_liked')
} 

 _setEventListeners(){
  this._element.querySelector('.element__delite-button').addEventListener('click', ()=>{
  this._handleDeleteCard()}); 
  this._element.querySelector('.element__heart-icon').addEventListener('click', ()=>{
  this._handleLikeIcon()}); 
  this._element.querySelector('.element__pic').addEventListener('click', ()=>{
  this._openPopupTypePicture(this._cardName, this._cardLink)})
} 

generateCard() {
  this._element = this._getTemplate();
  this._setEventListeners();
  this._element.querySelector('.element__pic').src = this._cardLink;
  this._element.querySelector('.element__name').textContent = this._cardName;
  this._element.querySelector('.element__pic').alt = this._cardName;
  return this._element;
}
}
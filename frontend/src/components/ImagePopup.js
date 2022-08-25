import React from "react";

export default function ImagePopup({ isOpen, card, onClose }) {
    
return (
<div className={`popup popup_img ${isOpen && "popup_opened"}`} id="popup-image">
  <div className="popup__container">
    <button onClick={onClose} type="button" className="popup__close" id="popup-close-image"></button>
    <img 
      src={card ? card.link : "#"}
      alt={card ? card.name : ""}
      className="popup__image" />
    <h2  className="popup__title popup__title_img">
      {card ? card.name : ""}
    </h2>
  </div>
</div>
);

}
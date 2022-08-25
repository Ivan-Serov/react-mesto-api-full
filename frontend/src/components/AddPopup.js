import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPopup({ isOpen, onClose, onAddPost }) {
  const [name, setMesto] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeInputMesto(e) {
    setMesto(e.target.value);
  }

  function handleChangeInputLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPost({
      name,
      link,
    });

    setMesto("");
    setLink("");
  }

  return (
    <PopupWithForm 
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title="Новое место"
        buttonText="Создать"
    >
        <input name="name" 
            id="title-location" 
            type="text" 
            placeholder="Название" 
            className="popup__input popup__input_type_title" 
            minLength="2" maxLength="30" 
            required 
            value={name}
            onChange={handleChangeInputMesto}/>
        <span id="title-location-error" className="error"></span>
        <input name="link" 
            id="link-image" 
            type="url" 
            placeholder="Ссылка на картинку" 
            className="popup__input popup__input_type_image-link" 
            required 
            value={link}
            onChange={handleChangeInputLink}/>
        <span id="link-image-error" className="error"></span>
    </PopupWithForm>
  );
}
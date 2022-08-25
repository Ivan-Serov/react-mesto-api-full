import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onEditUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name || '');
    setAbout(currentUser.about || '');
  }, [currentUser, isOpen]);

  function handleChangeInputName(e) {
    setName(e.target.value);
  }

  function handleChangeInputAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onEditUser({
      name,
      about,
    });
  }
  
  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <input name="name" 
        id="user" 
        type="text" 
        placeholder="Имя" 
        className="popup__input popup__input_type_user" 
        minLength="2" 
        maxLength="40" 
        required 
        value={name}
        onChange={handleChangeInputName}
      />
      <span id="user-error" className="error"></span>
      <input 
        name="about" 
        id="user-information" 
        type="text" 
        placeholder="О себе" 
        className="popup__input popup__input_type_user-information" 
        minLength="2" 
        maxLength="200" 
        required 
        value={about}
        onChange={handleChangeInputAbout}
      />
      <span id="user-information-error" className="error"></span>
  </PopupWithForm>
  );
}
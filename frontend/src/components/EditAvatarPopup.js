import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

  }

  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name= "avatar"
      buttonText="Сохранить"
    >
      <input 
        name="avatar" 
        id="link-avatar" 
        type="url" 
        placeholder="Ссылка на картинку" 
        className="popup__input popup__input_type_image-link" 
        required 
        ref={avatarRef}
      />
      <span id="link-avatar-error" className="error"></span>
  </PopupWithForm>
  );
}
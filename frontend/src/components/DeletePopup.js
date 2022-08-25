import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePostPopup({
  isOpen,
  onClose,
  card,
  onDeletePlace,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeletePlace(card);
  }

  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      name= "delete"
      buttonText="Да"
    />
  );
}
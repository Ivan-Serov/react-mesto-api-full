const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
const editButton = document.querySelector('.profile__edit');
const profiletitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
const formEditProfile = document.querySelector('#popup-form-edit');
const addButton = document.querySelector('.profile__add');
const formAddCard = document.querySelector('#popup-form-add');
const templateSelector = '#places-card-template';
const popupProfile="#popup-profile";
const sectionSelector = '.places';
const popupPlace = '#popup-add';
const popupImage ='#popup-image';
const avatar = '.profile__avatar';
const avatarFoto= '.profile__foto-avatar';
const formAvatar = document.querySelector('#popup-form-avatar');
const btnEditSave= document.querySelector('#btn-edit-save');
const btnAddSave =document.querySelector('#btn-add-save');
const btnAvatarSave =document.querySelector('#btn-avatar-save');
const btnDelSave =document.querySelector('#btn-delete-save');

  export {
    initialCards,
    profileSubtitle,
    profiletitle,
    editButton,
    formEditProfile,
    addButton,
    formAddCard,
    templateSelector,
    popupProfile,
    sectionSelector,
    popupPlace,
    popupImage,
    avatar,
    avatarFoto,
    formAvatar,
    btnEditSave,
    btnAddSave,
    btnAvatarSave,
    btnDelSave
  }

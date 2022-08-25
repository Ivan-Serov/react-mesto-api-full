import React from 'react';
import Card from './Card'
import '../index.css';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDeleteClick, cards}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar"  onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="avatar" className="profile__foto-avatar" />
        </div>
        <div className="profile__text-group">
          <div className="profile__title-box">
            <h1 className="profile__title">{currentUser.name }</h1>
            <button type="button" className="profile__edit" id="profE" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about }</p>
        </div>
        <button type="button" className="profile__add" onClick={onAddPlace}></button>
      </section>
      <section className="places">
        {cards.map((post) => (
        <Card card={post}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDeleteClick={onCardDeleteClick}
          key={post._id} 
        />
      ))}
      </section>  
    </main>
  );
}
  
export default Main;
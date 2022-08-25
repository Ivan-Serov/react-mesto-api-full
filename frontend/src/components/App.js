import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPopup from "./AddPopup";
import DeletePopup from "./DeletePopup";
import { Route, Routes, useNavigate, useLocation,Navigate } from 'react-router-dom';
import {api}  from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Register from '../components/Register';
import Login from '../components/Login';
import RequireAuth from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from '../components/InfoTooltip';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  const [isAddCardPopupOpen, setisAddCardPopupOpen] = React.useState(false);
  function handleAddCardClick() {
    setisAddCardPopupOpen(true);
  }
  const [isAvatarProfilePopupOpen, setisAvatarProfilePopupOpen] = React.useState(false);
  function handleAvatarProfileClick() {
    setisAvatarProfilePopupOpen(true);
  }
  const [selectedCard, setSelectedCard] = React.useState(null);
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpenen(true);
  }
  const [isImagePopupOpenen, setIsImagePopupOpenen] = React.useState(false);
  ////////////////////////
  const [isSucceed, setIsSucceed] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddCardPopupOpen(false);
    setisAvatarProfilePopupOpen(false);
    setSelectedCard(null);
    setIsDeletePopupOpenen(false);
    setIsImagePopupOpenen(false);
    setIsInfoTooltipOpen(false);
  }
  ////////////////////////////////////////////
  useEffect(() => {
    handleTokenCheck(location.pathname);
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, items]) => {
          setCurrentUser(user.data);
          setCards(items);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
    }
  }, [loggedIn]); 

  useEffect(() => {
    handleTokenCheck(location.pathname);
    console.log('lp'+location.pathname);
  }, []);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card){
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard.data : c)));
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
          console.log(card);
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
    }
  } 
////////////////
  function handleEditUser(data) {
    api
      .editProfile(data)
      .then((data) => {
        setCurrentUser(data.data);
        console.log(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .addAvatar(data)
      .then((data) => {
        console.log(data);
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleAddPlace(data) {
    api
      .addPlace(data)
      .then((newCard) => {
       // console.log(data);
       // console.log(newCard);
       // console.log(newCard.data);
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  const [isDeletePopupOpenen, setIsDeletePopupOpenen] =React.useState(false);
  function handleCardDeleteClick(card) {
    setIsDeletePopupOpenen(true);
    setSelectedCard(card);
  }
  function handleDeletePlace(card) {
    api
      .deletePost(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  const handleLogin = (email, password) => {
    auth
    .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setUserEmail(email);
        }
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSucceed(false);
        handleInfoTooltipPopupOpen();
      });
  };
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    // проверяем токен пользователя
    if(jwt){
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
    }
  };

  const handleLogout= (evt) => {
    evt.preventDefault();
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in')
  }

  const handleRegister = (password, email) => {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setIsSucceed(true);
          handleInfoTooltipPopupOpen();
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации ${err}`);
        setIsSucceed(false);
        handleInfoTooltipPopupOpen();
      });
  }; 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <Routes>
            <>
              <Route
                path="/"
                element={
                  <>
                    <RequireAuth loggedIn={loggedIn}>
                      <div>
                        <Header 
                        nav={'/sign-in'}
                        navStatus={'Выйти'} 
                        emailUser={userEmail} 
                        onLogout={handleLogout} 
                        />
                        <Main 
                          onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddCardClick}
                          onEditAvatar={handleAvatarProfileClick}
                          onCardClick={handleCardClick}
                          onCardLike={handleCardLike}
                          onCardDeleteClick={handleCardDeleteClick}
                          cards={cards}
                        />  
                        <Footer />
                      </div>
                    </RequireAuth>
                  </>
                }
              />  
              <Route path="/sign-up" element={<Register onRegister={handleRegister}/> } />
              <Route path="/sign-in" element={<Login onLogin={handleLogin}/>} />
              <Route
                  path='*'
                  element={loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />}
              />
            </> 
          </Routes>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSucceed={isSucceed}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onEditUser={handleEditUser}
          />
          <AddPopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddPost={handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={isAvatarProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup 
            isOpen={isImagePopupOpenen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <DeletePopup
            isOpen={isDeletePopupOpenen}
            onClose={closeAllPopups}
            card={selectedCard}
            onDeletePlace={handleDeletePlace}
          />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
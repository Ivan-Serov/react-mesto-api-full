import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Register({ onRegister }) {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.password, values.email);
  };

  return (
    <div className="register">
        <Header nav={'/sign-in'} navStatus={'Войти'} emailUser={''}/>
        <h1 className="register__welcome">Регистрация</h1>
        <form onSubmit={handleSubmit} className="register__form">
          <input id="email" name="email" type="email" placeholder="Email" className="register__input"
            value={values.email} onChange={handleChange} />
          <input id="password" name="password" type="password" placeholder="Пароль" className="register__input"
            value={values.password} onChange={handleChange} />
          <button type="submit" className="register__link" onSubmit={handleSubmit}>Зарегистрироваться</button>
        </form>
        <div className="register__signin">
          <p className="register__login-text">Уже зарегестрированы?</p>
          <Link to="/sign-in" className="register__login-link">Войти</Link>
        </div>
      </div>
  );
}
import React, { useState } from "react";
import Header from '../components/Header';

export default function Login({ onLogin }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
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
    onLogin( values.email, values.password);
    setValues({
      email: "",
      password: "",
    })
  };

  return (
    <div className="login">
      <Header nav={'/sign-up'} navStatus={'Регистрация'} emailUser={''}/>
      <p className="login__welcome">
        Вход
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        <input id="email" name="email" type="email" placeholder="Email" className="login__input"
          value={values.email} onChange={handleChange} />
        <input required id="password" name="password" type="password" placeholder="Пароль" className="login__input"
          value={values.password} onChange={handleChange} />
        <button type="submit" className="login__link" onSubmit={handleSubmit}>Войти</button>
      </form>
    </div>
  )
}

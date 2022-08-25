import React from 'react';
import success_icon from '../images/success-icon.svg';
import fail_icon from '../images/fail-icon.svg';

export default function InfoTooltip({ isOpen, onClose, isSucceed}) {
  const sectionClassName = `popup popup_login ${isOpen && "popup_opened"}`;
  const altOk ='OK';
  const altFail ='fail';
  return (
    <section className={sectionClassName} >
      <div className="popup__content" >
        <button className="popup__close_login"  type="button" onClick={onClose}></button>
        <img src={isSucceed ? success_icon : fail_icon}  alt={isSucceed ? altOk : altFail} className="popup__icon" /> 
        <h3 className="popup__title popup__title_login">
          {isSucceed ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз.'}
        </h3> 
      </div>
    </section>
  );
}

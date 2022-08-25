import React from 'react';
import { Link } from 'react-router-dom';
 
 function Header(props) {
   console.log('props' +props.emailUser);
  return (
    <header className="header">
        <div className="header__logo"></div>
        <div className="header__nav">
          <div className="header__nav_right">
            <p className={'header__status header__email'}>{props.emailUser}</p> 
            <Link to={props.nav} className={'header__link header__status'} onClick={props.onLogout}>{props.navStatus}</Link>
          </div>
        </div>
    </header>
  );
} 

export default Header;
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = (props) => {
  return (
    <header className={styles.header}>
      <img
        alt="Logo"
        src="https://cutewallpaper.org/24/icon-png-logos/press-55431-kit-b08ff-gitlab.png"
      ></img>
      <div className={styles.loginBlock}>
        {props.isAuthed ? (
          <NavLink to={'/login'}>{props.userName}</NavLink>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;

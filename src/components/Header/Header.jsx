import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../Login/Logout';
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
          <Logout isAuthed={props.isAuthed} onLogout={props.onLogout} />
        ) : (
          <div className={styles.links}>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/register'}>Sign up</NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.item}>
        <NavLink
          to="/profile"
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
        >
          Profile
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to="/dialogs"
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
        >
          Messages
        </NavLink>
      </div>
      <div className={styles.item}>
        <a>News</a>
      </div>
      <div className={styles.item}>
        <a>Music</a>
      </div>
      <div className={styles.item}>
        <a>Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;

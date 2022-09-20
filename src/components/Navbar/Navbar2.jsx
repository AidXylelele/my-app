import React from 'react';
import styles from './Navbar2.module.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';

const Navbar2 = (props) => {
  const [sideBar, setSideBar] = useState(true);
  const showSideBar = () => setSideBar(!sideBar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={styles.wrapper}>
          <div
            className={styles.navbar}
            style={sideBar ? { display: 'none' } : {}}
          >
            <Link to="#" className={styles.menu_bars}>
              <FaIcons.FaBars
                style={{ color: 'black' }}
                onClick={showSideBar}
              />
            </Link>
          </div>
          <div
            className={styles.nav_menu_active}
            style={!sideBar ? { display: 'none' } : {}}
          >
            <ul className={styles.nav_menu_items} onClick={showSideBar}>
              <li className={styles.navbar_toggle}>
                <Link to="#" className={styles.menu_bars}>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, idx) => {
                return (
                  <li key={idx} className={styles.nav_text}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Navbar2;

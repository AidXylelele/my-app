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
        <div
          className={styles.navbar}
          style={sideBar ? { display: 'none' } : {}}
          onClick={showSideBar}
        >
          <Link to="#" className={styles.navbar_open}>
            <FaIcons.FaBars style={{ color: 'black' }} />
          </Link>
        </div>
        <div
          className={styles.nav_menu_active}
          style={!sideBar ? { display: 'none' } : {}}
        >
          <div className={styles.wrapper_active_menu}>
            <ul className={styles.nav_menu_items}>
              {SidebarData.map((item, idx) => {
                return (
                  <li key={idx} className={styles.nav_text}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className={styles.title}>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className={styles.navbar_toggle} onClick={showSideBar}>
              <Link to="#" className={styles.menu_bars}>
                <AiIcons.AiOutlineClose />
              </Link>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Navbar2;

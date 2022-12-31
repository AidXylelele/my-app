import React from 'react';
import { NavLink } from 'react-router-dom';
import Profile from '../Profile/Profile';
import styles from './Users.module.css';

const Users = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <div>
          <span className={styles.nextPage} onClick={() => props.firstPage()}>
            {'<<'}
          </span>
          <span
            className={styles.nextPage}
            onClick={() => props.prevPage(props.selectedPage)}
          >
            {'<--'}
          </span>
          <span className={styles.selectedPage}>{props.selectedPage}</span>
          <span
            className={styles.nextPage}
            onClick={() => props.nextPage(props.selectedPage)}
          >
            {'-->'}
          </span>
          <span className={styles.nextPage} onClick={() => props.lastPage()}>
            {'>>'}
          </span>
        </div>
      </div>
      {props.usersData.map((item, key) => (
        <div className={styles.userData} key={key}>
          <NavLink to={'./../profile/' + item.id} element={<Profile />}>
            <img
              className={styles.avatar}
              src={
                // item.photos.large
                //   ? item.photos.large :
                'https://icon-library.com/images/users-icon-png/users-icon-png-6.jpg'
              }
              alt="There is an avatar"
            />
          </NavLink>
          <div className={styles.info}>
            <div key={key} className={styles.userName}>
              {`${item.name} ${item.surname}`}
            </div>
            {item.status ? (
              <span className={styles.containerOfInfo}>
                <p className={styles.beforeStatus}>User status:</p>
                <div className={styles.userStatus}>{item.status}</div>
              </span>
            ) : null}
            {item.status ? (
              <span className={styles.containerOfInfo}>
                <p className={styles.beforeSkills}>User skills:</p>
                <div className={styles.userSkills}>{item.status}</div>
              </span>
            ) : null}
            <div>
              {item.followed ? (
                <button
                  disabled={props.followRequests.some((idx) => idx === item.id)}
                  onClick={() => {
                    props.onGetBlockBtn(item.id, 'unfollowConfig');
                  }}
                >
                  UNFOLLOW
                </button>
              ) : (
                <button
                  disabled={props.followRequests.some((idx) => idx === item.id)}
                  onClick={() => {
                    props.onGetBlockBtn(item.id, 'followConfig');
                  }}
                >
                  FOLLOW
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;

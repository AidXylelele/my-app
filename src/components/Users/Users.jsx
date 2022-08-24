import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Profile from '../Profile/Profile';
import styles from './Users.module.css';

const configForRequests = {
  postConfig: {
    name: 'post',
    http: 'https://social-network.samuraijs.com/api/1.0/follow/',
    params: [
      {},
      {
        withCredentials: true,
        headers: {
          'API-KEY': '8723fb12-ffdb-46fc-a2bf-f6ce9b484d92',
        },
      },
    ],
  },
  deleteConfig: {
    name: 'delete',
    http: 'https://social-network.samuraijs.com/api/1.0/follow/',
    params: [
      {
        withCredentials: true,
        headers: {
          'API-KEY': '8723fb12-ffdb-46fc-a2bf-f6ce9b484d92',
        },
      },
    ],
  },
};

const Users = (props) => {
  const getFollowFromServer = (config, func, id) => {
    axios[config.name](config.http + id, ...config.params).then((response) => {
      if (response.data.resultCode === 0) {
        func(id);
      }
    });
  };

  return (
    <div>
      {props.countOfPages.map((num, idx) => (
        <span
          key={idx}
          className={props.selectedPage === num ? styles.selectedPage : ''}
          onClick={() => props.onPageChanged(num)}
        >
          {num}
        </span>
      ))}
      {props.usersData.map((item, key) => (
        <div key={key}>
          <div key={key}>{item.name}</div>
          <NavLink to={'./../profile/' + item.id} element={<Profile />}>
            <img
              className={styles.avatar}
              src={
                item.photos.large
                  ? item.photos.large
                  : 'https://icon-library.com/images/users-icon-png/users-icon-png-6.jpg'
              }
              alt="There is an avatar"
            />
          </NavLink>
          <span>
            <p>{item.status}</p>
          </span>
          <div>
            {item.followed ? (
              <button
                onClick={() => {
                  getFollowFromServer(
                    configForRequests.deleteConfig,
                    props.onFollowChange,
                    item.id
                  );
                }}
              >
                UNFOLLOW
              </button>
            ) : (
              <button
                onClick={() => {
                  getFollowFromServer(
                    configForRequests.postConfig,
                    props.onFollowChange,
                    item.id
                  );
                }}
              >
                FOLLOW
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;

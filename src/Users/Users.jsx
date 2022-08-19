import React from 'react';
import styles from './Users.module.css';
import * as axios from 'axios';

const Users = (props) => {
  const getUsers = () => {
    if (props.usersData.length === 0) {
      axios
        .get('https://social-network.samuraijs.com/api/1.0/users')
        .then((response) => {
          console.log(response);
          props.onSetNewUsers(response.data.items);
        });
    }
  };

  return (
    <div>
      <button onClick={getUsers}>Load Users</button>
      {props.usersData.map((item, key) => (
        <div key={key}>
          <div key={key}>{item.name}</div>
          <img
            className={styles.avatar}
            src={
              'https://icon-library.com/images/users-icon-png/users-icon-png-6.jpg'
            }
            alt="There is an avatar"
          />
          <span>
            <p>{'item.location.city'}</p>
            <p>{'item.location.country'}</p>
          </span>
          <span>
            <p>{item.status}</p>
          </span>
          <div>
            {item.followed ? (
              <button
                onClick={() => {
                  props.onFollowChange(item.id);
                }}
              >
                FOLLOWED
              </button>
            ) : (
              <button
                onClick={() => {
                  props.onFollowChange(item.id);
                }}
              >
                UNFOLLOWED
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;

import React from 'react';
import styles from './Users.module.css';

const Users = (props) => {
  if (props.usersData.length === 0) {
    props.onSetNewUsers([
      {
        id: 1,
        avatar:
          'https://yt3.ggpht.com/ytc/AKedOLT8IWBS5QKF7ED2_Cq-4tX5q9U165rawWgvjTHB=s900-c-k-c0x00ffffff-no-rj',
        followed: true,
        fullName: 'Mariia',
        status: 'Hello!',
        location: { city: 'Kyev', country: 'Ukraine' },
      },
      {
        id: 2,
        avatar:
          'https://yt3.ggpht.com/ytc/AKedOLT8IWBS5QKF7ED2_Cq-4tX5q9U165rawWgvjTHB=s900-c-k-c0x00ffffff-no-rj',
        followed: false,
        fullName: 'Alex',
        status: 'Have a pleasent journey!',
        location: { city: 'Kyev', country: 'Ukraine' },
      },
    ]);
  }

  return (
    <div>
      {props.usersData.map((item, key) => (
        <div key={key}>
          <div key={key}>{item.fullName}</div>
          <img
            className={styles.avatar}
            src={item.avatar}
            alt="There is an avatar"
          />
          <span>
            <p>{item.location.city}</p>
            <p>{item.location.country}</p>
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

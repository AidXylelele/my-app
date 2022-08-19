import React from 'react';
import styles from './Users.module.css';
import * as axios from 'axios';

class Users extends React.Component {
  constructor(props) {
    super(props);
    axios
      .get('https://social-network.samuraijs.com/api/1.0/users')
      .then((response) => {
        props.onSetNewUsers(response.data.items);
      });
  }

  render() {
    return (
      <div>
        {this.props.usersData.map((item, key) => (
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
                    this.props.onFollowChange(item.id);
                  }}
                >
                  FOLLOWED
                </button>
              ) : (
                <button
                  onClick={() => {
                    this.props.onFollowChange(item.id);
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
  }
}

export default Users;

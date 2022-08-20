import React from 'react';
import styles from './Users.module.css';
import * as axios from 'axios';

class Users extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.selectedPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.onSetNewUsers(response.data.items);
        this.props.onSetTotalUsersCount(response.data.totalCount);
      });
  }
  onPageChanged(number) {
    this.props.onSetCurrentPage(number);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${number}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.onSetNewUsers(response.data.items);
      });
  }
  render() {
    const pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    );
    const countOfPages = [];
    for (let i = 1; i <= pagesCount; i++) {
      countOfPages.push(i);
    }
    return (
      <div>
        {countOfPages.map((num, idx) => (
          <span
            key={idx}
            className={
              this.props.selectedPage === num ? styles.selectedPage : ''
            }
            onClick={() => this.onPageChanged(num)}
          >
            {num}
          </span>
        ))}
        {this.props.usersData.map((item, key) => (
          <div key={key}>
            <div key={key}>{item.name}</div>
            <img
              className={styles.avatar}
              src={
                item.photos.large ? item.photos.large : 'https://icon-library.com/images/users-icon-png/users-icon-png-6.jpg'
              }
              alt="There is an avatar"
            />
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

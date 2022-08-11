import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
  return (
    <div className={styles.item}>
      <img
        className={styles.avatarOfUser}
        src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png"
        alt="There is an avatar"
      ></img>
      <div className={styles.textOfPost}>
        <p>{props.message}</p>
      </div>
      <div className={styles.reactionsOfUsers}>
        <div className={styles.replyToPost}>
          <a>Reply</a>
        </div>
        <div className={styles.counterOfLikes}>
          <a>like: {props.like}</a>
        </div>
      </div>
    </div>
  );
};
export default Post;

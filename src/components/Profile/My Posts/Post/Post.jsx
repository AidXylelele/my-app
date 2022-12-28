import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Post.module.css';

const Post = (props) => {
  const { message, like, post_id, isMyPage, onUpdatePost, onDeletePost } =
    props;
  const [isActive, setIsActive] = useState(false);
  const [localPostUpdate, setLocalPostUpdate] = useState(message);

  useEffect(() => {
    setLocalPostUpdate(message);
  }, [message, setLocalPostUpdate]);

  const toggleInput = () => {
    if (isMyPage) {
      setIsActive(!isActive);
    }
  };

  const onChangeInput = (e) => {
    setLocalPostUpdate(e.currentTarget.value);
  };

  return (
    <div className={styles.item}>
      <img
        className={styles.avatarOfUser}
        src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png"
        alt="There is an avatar"
      ></img>
      {isActive ? (
        <span>
          <input
            autoFocus={true}
            onBlur={() => {
              toggleInput();
              onUpdatePost(post_id, localPostUpdate);
            }}
            onChange={onChangeInput}
            type="text"
            value={localPostUpdate}
            placeholder={localPostUpdate}
          />
        </span>
      ) : isMyPage ? (
        <>
          <span className={styles.status} onDoubleClick={toggleInput}>
            {message}
          </span>
          <button onClick={() => onDeletePost(post_id)}>Delete</button>
        </>
      ) : (
        <span className={styles.status}>{message}</span>
      )}
      <div className={styles.reactionsOfUsers}>
        <div className={styles.replyToPost}>
          <a href="/reply">Reply</a>
        </div>
        <div className={styles.counterOfLikes}>
          <a href="/like">like: {like}</a>
        </div>
      </div>
    </div>
  );
};
export default Post;

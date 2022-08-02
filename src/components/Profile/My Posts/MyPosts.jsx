import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  const postsElements = props.postData.map((post) => (
    <Post message={post.message} like={post.likesCount} />
  ));

  const newPostElement = React.createRef();
  const controllerOfTextArea = () => {
    props.dispatch({ type: 'ADD-POST' });
  };

  const onChangeTextarea = () => {
    const text = newPostElement.current.value;
    props.dispatch({ type: 'UPDATE-NEW-POST-TEXT', newText: text });
  };

  return (
    <div className={styles.posts}>
      <div className={styles.postBlock}>
        <div>
          <h1>New Post</h1>
          <div className={styles.postText}>
            <textarea
              placeholder="Your text..."
              ref={newPostElement}
              onChange={onChangeTextarea}
              value={props.newPostText}
            />
          </div>
          <div className={styles.postButton}>
            <button onClick={controllerOfTextArea}>Add post</button>
          </div>
        </div>
        <div>
          <h1>Your Posts</h1>
          <div className={styles.post}>{postsElements}</div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;

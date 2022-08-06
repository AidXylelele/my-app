import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  const postsElements = props.postsData.map((post, idx) => (
    <Post message={post.message} like={post.likesCount} key={idx} />
  ));

  const newPostElement = React.createRef();

  const sendNewPost = () => {
    props.addNewPost();
  };

  const controllerOfTextArea = () => {
    const text = newPostElement.current.value;
    props.updateNewPostText(text);
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
              onChange={controllerOfTextArea}
              value={props.newPostText}
            />
          </div>
          <div className={styles.postButton}>
            <button onClick={sendNewPost}>Add post</button>
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

import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  const postsElements = props.postData.map((post) => (
    <Post message={post.message} like={post.likesCount} />
  ));

  const newPostElement = React.createRef();
  const controllerOfTextArea = (newPostElement) => {
    const text = newPostElement.current.value;
    if (text == "") return;
    props.addPost(text);
    newPostElement.current.value = "";
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
            ></textarea>
          </div>
          <div className={styles.postButton}>
            <button
              onClick={() => {
                controllerOfTextArea(newPostElement);
              }}
            >
              Add post
            </button>
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

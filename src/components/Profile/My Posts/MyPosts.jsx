import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  const postsElements = props.postData.map((post) => (
    <Post message={post.message} like={post.likesCount} />
  ));
  return (
    <div className={styles.posts}>
      <div className={styles.postBlock}>
        <div>
          <h1>New Post</h1>
          <div className={styles.postText}>
            <textarea placeholder="Your text..."></textarea>
          </div>
          <div className={styles.postButton}>
            <button>Add post</button>
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

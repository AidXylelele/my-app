import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {

  const postsElements = props.postData.map((post) => (
    <Post message={post.message} like={post.likesCount} />
  ));
  return (
    <div className={styles.posts}>
      <h2>My Posts</h2>
      <div>
        <div className={styles.postText}>
          <textarea placeholder="Your text..."></textarea>
        </div>
        <div className={styles.postButton}>
          <button>Add post</button>
        </div>
      </div>
      <div className={styles.post}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;

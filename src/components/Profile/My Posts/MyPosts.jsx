import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
  return (
    <div>
      My Posts
      <div>
        <textarea placeholder="Your text..."></textarea>
        <button>Add post</button>
      </div>
      <div className={styles.posts}>
        <Post />
      </div>
    </div>
  );
};

export default MyPosts;

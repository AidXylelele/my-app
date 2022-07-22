import React from "react";
import styles from "./Post.module.css";

const Post = (props) => {
  return (
    
        <div className={styles.item}>
          <img src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png"></img>
          Text of the post
          <div>
            like: {props.like}
          </div>
        </div>
  );
};

export default Post;

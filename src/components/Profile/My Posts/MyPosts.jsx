import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import PostForm from './Post/PostForm/PostForm';

const MyPosts = (props) => {
  if (!props.profileOfUser) {
    return null;
  }

  const postsElements = props.postsData.map((post, idx) => (
    <Post message={post.message} like={post.likesCount} key={idx} />
  ));

  return (
    <div className={styles.posts}>
      <div className={styles.postBlock}>
        <div>
          <h1>New Post</h1>
          <div className={styles.postText}>
            <PostForm onAddNewPost={props.addNewPost} />
          </div>
        </div>
        <div className={styles.userPosts}>
          <h1>Your Posts</h1>
          <div className={styles.post}>{postsElements}</div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;

import React, { useEffect } from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import PostForm from './Post/PostForm/PostForm';

const MyPosts = (props) => {
  const { profileOfUser, onSetPosts, onCreatePost, onUpdatePost } = props;
  useEffect(() => {
    if (profileOfUser) {
      onSetPosts(profileOfUser.id);
    }
  }, [onSetPosts, profileOfUser]);
  if (!props.profileOfUser) {
    return null;
  }
  const postsElements = props.postsData.map((post, idx) => (
    <Post
      post_id={post.post_id}
      message={post.message}
      isMyPage={props.isMyPage}
      like={post.likesCount}
      key={idx}
      onUpdatePost={onUpdatePost}
    />
  ));

  return (
    <div className={styles.posts}>
      <div className={styles.postBlock}>
        <div>
          <h1>New Post</h1>
          <div className={styles.postText}>
            <PostForm {...{ onCreatePost, userId: profileOfUser.id }} />
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

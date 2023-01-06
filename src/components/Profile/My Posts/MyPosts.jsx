import React, { useEffect } from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import PostForm from './Post/PostForm/PostForm';

const MyPosts = (props) => {
  const {
    profileOfUser,
    postsData,
    isMyPage,
    onSetPosts,
    onCreatePost,
    onUpdatePost,
    onDeletePost,
  } = props;
  useEffect(() => {
    if (profileOfUser) {
      onSetPosts(profileOfUser.id);
    }
  }, [onSetPosts, profileOfUser, postsData]);
  if (!props.profileOfUser) {
    return null;
  }
  const postsElements = postsData.map((post, idx) => (
    <Post
      post_id={post.post_id}
      date={post.post_date}
      message={post.message}
      isMyPage={props.isMyPage}
      like={post.likesCount}
      key={idx}
      onUpdatePost={onUpdatePost}
      onDeletePost={onDeletePost}
    />
  ));

  return (
    <div className={styles.posts}>
      <div className={styles.postBlock}>
        {isMyPage ? (
          <div>
            <h1>New Post</h1>
            <div className={styles.postText}>
              <PostForm {...{ onCreatePost, userId: profileOfUser.id }} />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.userPosts}>
          <h1>Your Posts</h1>
          <div className={styles.post}>{postsElements}</div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;

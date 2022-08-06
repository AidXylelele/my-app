import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addPost,
  updateNewPost,
  updateNewPostAction,
} from '../../../redux/profileSlice';
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {
  const dispatch = useDispatch();

  const state = props.store.getState();

  const addNewPost = () => {
    dispatch(addPost());
  };

  const onNewPostChange = (text) => {
    dispatch(updateNewPost(updateNewPostAction({ newText: text })));
  };

  return (
    <MyPosts
      updateNewPostText={onNewPostChange}
      addNewPost={addNewPost}
      postsData={state.profilePage.postsData}
      newPostText={state.profilePage.newPostText}
    />
  );
};

export default MyPostsContainer;

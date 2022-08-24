import { connect } from 'react-redux';
import {
  addPost,
  updateNewPost,
  updateNewPostAction,
} from '../../../redux/profileSlice';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
    profileOfUser: state.profilePage.profileOfUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      dispatch(updateNewPost({ newText: text }));
    },
    addNewPost: () => {
      dispatch(addPost());
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

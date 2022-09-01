import { connect } from 'react-redux';
import { addPostAction } from '../../../redux/profileSlice';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    profileOfUser: state.profilePage.profileOfUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (text) => {
      dispatch(addPostAction(text));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

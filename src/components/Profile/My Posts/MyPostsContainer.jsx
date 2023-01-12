import { connect } from 'react-redux';
import userAction from '../../../redux/profileSlice';
import selectors from '../../../redux/selectors';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    postsData: selectors.postData(state),
    profileOfUser: selectors.profileOfUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPosts: (userId) => {
      dispatch(userAction.getUserPostsThunk(userId));
    },
    onCreatePost: (userId, data) => {
      dispatch(userAction.createUserPostThunk(userId, data));
    },
    onUpdatePost: (postId, data) => {
      dispatch(userAction.updateUserPostThunk(postId, data));
    },
    onDeletePost: (postId) => {
      dispatch(userAction.deleteUserPostThunk(postId));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

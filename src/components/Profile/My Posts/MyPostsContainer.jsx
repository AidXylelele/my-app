import { connect } from 'react-redux';
import {
  createUserPostThunk,
  deleteUserPostThunk,
  getUserPostsThunk,
  updateUserPostThunk,
} from '../../../redux/profileSlice';
import {
  postDataSelector,
  profileOfUserSelector,
} from '../../../redux/selectors';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    postsData: postDataSelector(state),
    profileOfUser: profileOfUserSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPosts: (userId) => {
      dispatch(getUserPostsThunk(userId));
    },
    onCreatePost: (userId, data) => {
      dispatch(createUserPostThunk(userId, data));
    },
    onUpdatePost: (postId, data) => {
      dispatch(updateUserPostThunk(postId, data));
    },
    onDeletePost: (postId) => {
      dispatch(deleteUserPostThunk(postId));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

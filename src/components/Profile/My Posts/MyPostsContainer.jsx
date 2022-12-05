import { connect } from 'react-redux';
import {
  createUserPostThunk,
  getUserPostsThunk,
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
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

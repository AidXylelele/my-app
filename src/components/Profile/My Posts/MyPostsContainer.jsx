import { connect } from 'react-redux';
import { addPostAction } from '../../../redux/profileSlice';
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
    addNewPost: (text) => {
      dispatch(addPostAction(text));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

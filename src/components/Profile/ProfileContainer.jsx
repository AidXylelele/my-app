import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getProfileThunkCreator,
  getUserStatusThunkCreator,
  setUserProfileAction,
  updateUserStatusThunkCreator,
} from '../../redux/profileSlice';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/AuthRedirect';
import {
  myUserIdSelector,
  profileOfUserSelector,
  userStatusSelector,
} from '../../redux/selectors';

const ProfileContainer = (props) => {
  const { userId } = useParams();
  const { onGetProfile, onGetUserStatus } = props;
  useEffect(() => {
    onGetProfile(userId);
    onGetUserStatus(userId);
  }, [onGetProfile, onGetUserStatus, userId]);
console.log(props)
  return (
    <Profile
      myUserId={props.myUserId}
      profileOfUser={props.profileOfUser}
      userStatus={props.userStatus}
      onUpdateUserStatus={props.onUpdateUserStatus}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    myUserId: myUserIdSelector(state),
    profileOfUser: profileOfUserSelector(state),
    userStatus: userStatusSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserProfile: (item) => {
      dispatch(setUserProfileAction(item));
    },
    onGetProfile: (userId) => {
      dispatch(getProfileThunkCreator(userId));
    },
    onGetUserStatus: (userId) => {
      dispatch(getUserStatusThunkCreator(userId));
    },
    onUpdateUserStatus: (data) => {
      dispatch(updateUserStatusThunkCreator(data));
    },
  };
};

const withAuthProfileContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(ProfileContainer);

export default withAuthProfileContainer;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/AuthRedirect';
import selectors from '../../redux/selectors';
import { useState } from 'react';
import userAction from '../../redux/profileSlice';

const ProfileContainer = (props) => {
  const { userId } = useParams();
  const { onGetProfile, onGetUserStatus, onGetUserSkills, myUserId } = props;
  const [isMyPage, setIsMyPage] = useState(myUserId === userId);

  useEffect(() => {
    onGetProfile(userId);
    onGetUserStatus(userId);
    onGetUserSkills(userId);
    setIsMyPage(userId === myUserId);
  }, [
    onGetProfile,
    onGetUserStatus,
    onGetUserSkills,
    setIsMyPage,
    userId,
    myUserId,
  ]);
  return (
    <Profile
      isMyPage={isMyPage}
      profileOfUser={props.profileOfUser}
      userStatus={props.userStatus}
      userSkills={props.userSkills}
      onUpdateUserStatus={props.onUpdateUserStatus}
      onUpdateUserSkills={props.onUpdateUserSkills}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    myUserId: selectors.myUserId(state),
    profileOfUser: selectors.profileOfUser(state),
    userStatus: selectors.userStatus(state),
    userSkills: selectors.userSkills(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserProfile: (item) => {
      dispatch(userAction.setUserProfile(item));
    },
    onGetProfile: (userId) => {
      dispatch(userAction.getProfileThunk(userId));
    },
    onGetUserStatus: (userId) => {
      dispatch(userAction.getUserStatusThunk(userId));
    },
    onUpdateUserStatus: (data, userId) => {
      dispatch(userAction.updateUserStatusThunk(data, userId));
    },
    onGetUserSkills: (userId) => {
      dispatch(userAction.getUserSkillsThunk(userId));
    },
    onUpdateUserSkills: (data, userId) => {
      dispatch(userAction.updateUserSkillsThunk(data, userId));
    },
  };
};

const withAuthProfileContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(ProfileContainer);

export default withAuthProfileContainer;

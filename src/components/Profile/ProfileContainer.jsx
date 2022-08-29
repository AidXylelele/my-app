import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getProfileThunkCreator,
  setUserProfileAction,
} from '../../redux/profileSlice';
import Profile from './Profile';
import { Navigate, useParams } from 'react-router-dom';

const ProfileContainer = (props) => {
  const { userId } = useParams();
  const { onGetProfile } = props;
  useEffect(() => {
    onGetProfile(userId);
  }, [onGetProfile, userId]);

  if (!props.isAuthed) {
    return <Navigate to={'/login'} />;
  }

  return <Profile profileOfUser={props.profileOfUser} />;
};

const mapStateToProps = (state) => {
  return {
    profileOfUser: state.profilePage.profileOfUser,
    isAuthed: state.auth.isAuthed,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

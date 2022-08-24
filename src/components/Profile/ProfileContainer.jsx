import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profileSlice';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import { configForRequests, usersRequests } from '../../api/requestsAPI';

const ProfileContainer = (props) => {
  const { userId } = useParams();
  const { onSetUserProfile } = props;
  useEffect(() => {
    usersRequests(configForRequests.profileConfig, [userId ? userId : 2]).then(
      (response) => {
        onSetUserProfile(response);
      }
    );
  }, [onSetUserProfile, userId]);
  return <Profile profileOfUser={props.profileOfUser} />;
};

const mapStateToProps = (state) => {
  return {
    profileOfUser: state.profilePage.profileOfUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserProfile: (item) => {
      dispatch(setUserProfile({ item }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

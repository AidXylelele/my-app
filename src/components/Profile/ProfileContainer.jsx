import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profileSlice';
import Profile from './Profile';
import { useParams } from 'react-router-dom';

const ProfileContainer = (props) => {
  const { userId } = useParams();
  const { onSetUserProfile } = props;
  useEffect(() => {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/${
          userId ? userId : 2
        }`
      )
      .then((response) => {
        onSetUserProfile(response.data);
      });
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

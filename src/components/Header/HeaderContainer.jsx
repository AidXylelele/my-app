import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setAuthed, setUserData } from '../../redux/authSlice';
import Header from './Header';

const HeaderContainer = (props) => {
  const { onSetUserData, isAuthed, onSetAuthed } = props;
  const refContainer = useRef(isAuthed);
  useEffect(() => {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/auth/me', {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          onSetAuthed(!refContainer.current);
          onSetUserData(response.data.data);
        }
      });
  }, [onSetAuthed, onSetUserData]);
  return <Header {...props} />;
};

const mapStateToProps = (state) => {
  return {
    isAuthed: state.auth.isAuthed,
    userName: state.auth.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserData: (data) => {
      dispatch(setUserData({ data }));
    },
    onSetAuthed: (flag) => {
      dispatch(setAuthed({ flag }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

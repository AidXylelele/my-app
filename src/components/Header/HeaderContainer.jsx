import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { configForRequests, usersRequests } from '../../api/requestsAPI';
import { setAuthed, setUserData } from '../../redux/authSlice';
import Header from './Header';

const HeaderContainer = (props) => {
  const { onSetUserData, isAuthed, onSetAuthed } = props;
  const refContainer = useRef(isAuthed);
  useEffect(() => {
    usersRequests(configForRequests.authConfig, []).then((response) => {
      if (response.resultCode === 0) {
        onSetAuthed(!refContainer.current);
        onSetUserData(response.data);
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

import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getAuthThunkCreator,
  setAuthedAction,
  setUserDataAction,
} from '../../redux/authSlice';
import Header from './Header';

const HeaderContainer = (props) => {
  const { isAuthed, onGetAuthedThunk } = props;
  const refContainer = useRef(isAuthed);

  useEffect(() => {
    onGetAuthedThunk(refContainer);
  }, [onGetAuthedThunk]);
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
      dispatch(setUserDataAction(data));
    },
    onSetAuthed: (flag) => {
      dispatch(setAuthedAction(flag));
    },
    onGetAuthedThunk: (container) => {
      dispatch(getAuthThunkCreator(container));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

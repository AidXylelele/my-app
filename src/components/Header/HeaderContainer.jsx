import React from 'react';
import { connect } from 'react-redux';
import {
  getLogOutThunkCreator,
  setUserDataAction,
} from '../../redux/authSlice';
import { isAuthedSelector } from '../../redux/selectors';
import Header from './Header';

const HeaderContainer = (props) => {
  return <Header {...props} />;
};

const mapStateToProps = (state) => {
  return {
    isAuthed: isAuthedSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserData: (data) => {
      dispatch(setUserDataAction(data));
    },
    onLogout: (container) => {
      dispatch(getLogOutThunkCreator(container));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

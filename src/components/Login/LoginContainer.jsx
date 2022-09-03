import React from 'react';
import { connect } from 'react-redux';
import {
  getLoginThunkCreator,
  getLogOutThunkCreator,
} from '../../redux/authSlice';
import LoginForm from './LoginForm';
import Logout from './Logout';

const Login = (props) => {
  return (
    <>
      {props.isAuthed ? (
        <Logout isAuthed={props.isAuthed} onLogout={props.onLogout} />
      ) : (
        <LoginForm {...props} />
      )}
    </>
  );
};

const mapStatetoProps = (state) => ({
  isAuthed: state.auth.isAuthed,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data, container) => {
    dispatch(getLoginThunkCreator(data, container));
  },
  onLogout: (container) => {
    dispatch(getLogOutThunkCreator(container));
  },
});

const LoginContainer = connect(mapStatetoProps, mapDispatchToProps)(Login);
export default LoginContainer;

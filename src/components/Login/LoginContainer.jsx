import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoginThunkCreator } from '../../redux/authSlice';
import selectors from '../../redux/selectors';
import LoginForm from './LoginForm';

const Login = (props) => {
  return (
    <>
      {props.isAuthed ? (
        <Navigate to={`/profile/${props.me}`} />
      ) : (
        <LoginForm {...props} />
      )}
    </>
  );
};

const mapStatetoProps = (state) => ({
  me: selectors.myUserId(state),
  isAuthed: selectors.isAuthed(state),
  error: selectors.loginError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data, container) => {
    dispatch(getLoginThunkCreator(data, container));
  },
});

const LoginContainer = connect(mapStatetoProps, mapDispatchToProps)(Login);
export default LoginContainer;

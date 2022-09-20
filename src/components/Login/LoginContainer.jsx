import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoginThunkCreator } from '../../redux/authSlice';
import { isAuthedSelector, loginErrorSelector } from '../../redux/selectors';
import LoginForm from './LoginForm';

const Login = (props) => {
  return (
    <>
      {props.isAuthed ? <Navigate to={'/profile'} /> : <LoginForm {...props} />}
    </>
  );
};

const mapStatetoProps = (state) => ({
  isAuthed: isAuthedSelector(state),
  error: loginErrorSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data, container) => {
    dispatch(getLoginThunkCreator(data, container));
  },
});

const LoginContainer = connect(mapStatetoProps, mapDispatchToProps)(Login);
export default LoginContainer;

import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoginThunkCreator } from '../../redux/authSlice';
import LoginForm from './LoginForm';

const Login = (props) => {
  return (
    <>
      {props.isAuthed ? <Navigate to={'/profile'} /> : <LoginForm {...props} />}
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
});

const LoginContainer = connect(mapStatetoProps, mapDispatchToProps)(Login);
export default LoginContainer;

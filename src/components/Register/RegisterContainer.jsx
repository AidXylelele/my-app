import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoginThunkCreator } from '../../redux/authSlice';
import {
  isAuthedSelector,
  loginErrorSelector,
  myUserIdSelector,
} from '../../redux/selectors';
import RegisterForm from './RegisterForm';

const Register = (props) => {
  return (
    <>
      {props.isRegistered ? (
        <Navigate to={`/login}`} />
      ) : (
        <RegisterForm {...props} />
      )}
    </>
  );
};

const mapStatetoProps = (state) => ({
  me: myUserIdSelector(state),
  isAuthed: isAuthedSelector(state),
  error: loginErrorSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data, container) => {
    dispatch(getLoginThunkCreator(data, container));
  },
});

const RegisterContainer = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Register);
export default RegisterContainer;

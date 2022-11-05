import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getRegisteredThunkCreator } from '../../redux/registerSlice';
import { isAuthedSelector, registerErrorSelector } from '../../redux/selectors';
import RegisterForm from './RegisterForm';

const Register = (props) => {
  return (
    <>
      {props.isAuthed ? (
        <Navigate to={`/login`} />
      ) : (
        <RegisterForm {...props} />
      )}
    </>
  );
};

const mapStatetoProps = (state) => ({
  error: registerErrorSelector(state),
  isAuthed: isAuthedSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRegister: (data, container) => {
    dispatch(getRegisteredThunkCreator(data, container));
  },
});

const RegisterContainer = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Register);
export default RegisterContainer;

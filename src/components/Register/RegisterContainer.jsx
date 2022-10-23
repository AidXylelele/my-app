import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getRegisteredThunkCreator } from '../../redux/registerSlice';
import { isRegisteredSelector } from '../../redux/selectors';
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
  isRegistered: isRegisteredSelector(state),
  //   error: registerErrorSelector(state),
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

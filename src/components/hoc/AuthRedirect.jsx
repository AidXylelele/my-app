import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isAuthedSelector } from '../../redux/selectors';

const mapStateToProps = (state) => {
  return {
    isAuthed: isAuthedSelector(state),
  };
};

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!props.isAuthed) {
      return <Navigate to={'/login'} />;
    }
    return <Component {...props} />;
  };
  const withRedirectComponent = connect(mapStateToProps)(RedirectComponent);
  return withRedirectComponent;
};

import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import selectors from '../../redux/selectors';

const mapStateToProps = (state) => {
  return {
    isAuthed: selectors.isAuthed(state),
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

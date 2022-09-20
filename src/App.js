import React, { useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import { connect } from 'react-redux';
import { getInitializedThunkCreator } from './redux/appSlice';
import PreLoader from './components/common/Preloader/Preloader';
import Navbar2 from './components/Navbar/Navbar2';

const App = (props) => {
  const { onSetInitialized, initialized } = props;
  const refContainer = useRef(initialized);

  useEffect(() => {
    onSetInitialized(refContainer);
  }, [onSetInitialized]);

  if (!initialized) {
    return <PreLoader />;
  }

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar2 />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/profile" element={<ProfileContainer />}>
              <Route path=":userId" element={<ProfileContainer />} />
            </Route>
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<LoginContainer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

const mapStatetoProps = (state) => ({
  initialized: state.app.initialized,
});

const mapDispatchToProps = (dispatch) => ({
  onSetInitialized: (container) => {
    dispatch(getInitializedThunkCreator(container));
  },
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);

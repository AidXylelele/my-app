import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/profile' element={<Profile state={props.state.profilePage} addPost={props.addPost} />} />
            <Route path='/dialogs' element={<Dialogs state={props.state.dialogsPage} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

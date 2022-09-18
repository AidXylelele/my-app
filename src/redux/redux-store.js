import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import thunkMiddleWare from 'redux-thunk';
import appSlice from './appSlice';
import authSlice from './authSlice';
import dialogsSlice from './dialogsSlice';
import profileSlice from './profileSlice';
import sideBarReducer from './sideBarReducer';
import usersSlice from './usersSlice';

const reducers = combineReducers({
  profilePage: profileSlice,
  dialogsPage: dialogsSlice,
  usersPage: usersSlice,
  sideBar: sideBarReducer,
  auth: authSlice,
  app: appSlice,
});

export const store = configureStore(
  { reducer: reducers },
  applyMiddleware(thunkMiddleWare)
);

window.store = store;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dialogsSlice from './dialogsSlice';
import profileSlice from './profileSlice';
import sideBarReducer from './sideBarReducer';
import usersSlice from './usersSlice';

const reducers = combineReducers({
  profilePage: profileSlice,
  dialogsPage: dialogsSlice,
  usersPage: usersSlice,
  sideBar: sideBarReducer,
});

export const store = configureStore({ reducer: reducers });

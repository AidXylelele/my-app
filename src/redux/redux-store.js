import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dialogsSlice from './dialogsSlice';
import profileSlice from './profileSlice';
import sideBarReducer from './sideBarReducer';

const reducers = combineReducers({
  profilePage: profileSlice,
  dialogsPage: dialogsSlice,
  sideBar: sideBarReducer,
});

export const store = configureStore({ reducer: reducers });

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dialogsSlice from './dialogsSlice';
import profileReducer from './profileReducer';
import sideBarReducer from './sideBarReducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsSlice,
  sideBar: sideBarReducer,
});

export const store = configureStore({ reducer: reducers });

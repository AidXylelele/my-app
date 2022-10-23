import { createAction, createSlice } from '@reduxjs/toolkit';
import {
  configForRequests,
  deleteAndPostRequests,
  getRequests,
} from '../api/requestsAPI';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    userId: null,
    login: null,
    email: null,
    isRegistered: false,
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      const data = action.payload;
      data.id ? (state.userId = data.id) : (state.userId = null);
      data.login ? (state.login = data.login) : (state.login = null);
      data.email ? (state.email = data.email) : (state.email = null);
    },
    setRegistered: (state, action) => {
      const flag = action.payload;
      state.isAuthed = flag;
    },
    setError: (state, action) => {
      const error = action.payload;
      state.error = error;
    },
  },
});

export const setUserDataAction = createAction('register/setUserData');
export const setRegisteredAction = createAction('register/setRegistered');
export const setErrorAction = createAction('register/setError');

export const getRegisteredThunkCreator = (data, container) => (dispatch) => {
  return deleteAndPostRequests(configForRequests.registerConfig, '', data).then(
    (response) => {
      return response;
    }
  );
};

export default registerSlice.reducer;
export const { setUserData, setRegistered } = registerSlice.actions;

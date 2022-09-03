import { createAction, createSlice } from '@reduxjs/toolkit';
import {
  configForRequests,
  deleteAndPostRequests,
  getRequests,
} from '../api/requestsAPI';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    login: null,
    email: null,
    isAuthed: false,
  },
  reducers: {
    setUserData: (state, action) => {
      const data = action.payload;
      data.id ? (state.userId = data.id) : (state.userId = null);
      data.login ? (state.login = data.login) : (state.login = null);
      data.email ? (state.email = data.email) : (state.email = null);
    },
    setAuthed: (state, action) => {
      const flag = action.payload;
      state.isAuthed = flag;
    },
  },
});

export const setUserDataAction = createAction('auth/setUserData');
export const setAuthedAction = createAction('auth/setAuthed');

export const getAuthThunkCreator = (container) => (dispatch) => {
  getRequests(configForRequests.authConfig, []).then((response) => {
    if (response.resultCode === 0) {
      dispatch(setAuthedAction(!container.current));
      dispatch(setUserDataAction(response.data));
    }
  });
};

export const getLoginThunkCreator = (data, container) => (dispatch) => {
  deleteAndPostRequests(configForRequests.loginConfig, '', data).then(
    (response) => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthThunkCreator(container));
      }
    }
  );
};

export const getLogOutThunkCreator = (container) => (dispatch) => {
  deleteAndPostRequests(configForRequests.logOutConfig, '').then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthedAction(!container.current));
      dispatch(setUserDataAction({}));
    }
  });
};

export default authSlice.reducer;
export const { setUserData, setAuthed } = authSlice.actions;

import { createAction, createSlice } from '@reduxjs/toolkit';
import {
  configForRequests,
  deleteAndPostRequests,
  getRequests,
} from '../api/requestsAPI';
import JSConfetti from 'js-confetti';
const confetti = new JSConfetti();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    login: null,
    email: null,
    isAuthed: false,
    error: null,
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
    setError: (state, action) => {
      const error = action.payload;
      state.error = error;
    },
  },
});

export const setUserDataAction = createAction('auth/setUserData');
export const setAuthedAction = createAction('auth/setAuthed');
export const setErrorAction = createAction('auth/setError');

export const getAuthThunkCreator = (container) => (dispatch) => {
  return getRequests(configForRequests.authConfig, []).then((response) => {
    if (response.resultCode === 0) {
      dispatch(setAuthedAction(!container.current));
      dispatch(setUserDataAction(response.data));
    }
  });
};

export const getLoginThunkCreator = (data, container) => (dispatch) => {
  deleteAndPostRequests(configForRequests.loginConfig, '', data)
    .then((response) => {
      if (!response.data.resultCode) {
        dispatch(getAuthThunkCreator(container));
      }
      return response.data;
    })
    .then((response) => {
      if (!response.resultCode) {
        confetti.addConfetti({
          emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
          confettiRadius: 6,
        });
      }
      dispatch(setErrorAction(response.messages.toString()));
    });
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

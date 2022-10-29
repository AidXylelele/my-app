import { createAction, createSlice } from '@reduxjs/toolkit';
import {
  configForRequests,
  deleteAndPostRequests,
  getRequests,
} from '../api/requestsAPI';
import { getAuthThunkCreator } from './authSlice';
import JSConfetti from 'js-confetti';
const confetti = new JSConfetti();

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    error: null,
  },
  reducers: {
    setError: (state, action) => {
      const error = action.payload;
      state.error = error;
    },
  },
});

export const setErrorAction = createAction('register/setError');

export const getRegisteredThunkCreator = (data, container) => (dispatch) => {
  return deleteAndPostRequests(configForRequests.registerConfig, '', data)
    .then((response) => {
      // if (!response.data.resultCode) {
      //   dispatch(getAuthThunkCreator(container));
      // }
      return response.data;
    })
    .then((response) => {
      if (!response.data.resultCode) {
        confetti.addConfetti({
          emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
          confettiRadius: 6,
        });
      }
      console.log(response.messages);
      dispatch(setErrorAction(response.messages));
    });
};

export default registerSlice.reducer;

import { createAction, createSlice } from '@reduxjs/toolkit';
import { configForRequests, deleteAndPostRequests } from '../api/requestsAPI';
import { getLoginThunkCreator } from './authSlice';

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
      if (response.data.resultCode === 0) {
        dispatch(getLoginThunkCreator(data, container));
      }
      return response.data;
    })
    .then((response) => {
      dispatch(setErrorAction(response.messages));
    });
};

export default registerSlice.reducer;

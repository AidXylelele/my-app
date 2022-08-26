import { createAction, createSlice } from '@reduxjs/toolkit';
import { configForRequests, usersRequests } from '../api/requestsAPI';

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
      state.userId = data.id;
      state.login = data.login;
      state.email = data.email;
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
  usersRequests(configForRequests.authConfig, []).then((response) => {
    if (response.resultCode === 0) {
      dispatch(setAuthedAction(!container.current));
      dispatch(setUserDataAction(response.data));
    }
  });
};

export default authSlice.reducer;
export const { setUserData, setAuthed } = authSlice.actions;

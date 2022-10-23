import { createAction, createSlice } from '@reduxjs/toolkit';
import { getAuthThunkCreator } from './authSlice';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    initialized: true,
  },
  reducers: {
    setInitialized: (state, action) => {
      const flag = action.payload;
      state.initialized = flag;
    },
  },
});

export const setInitializedAction = createAction('app/setInitialized');

export const getInitializedThunkCreator = (container) => (dispatch) => {
  const promise = dispatch(getAuthThunkCreator(container));
  Promise.all([promise]).then(() => {
    dispatch(setInitializedAction(true));
  });
};

export default appSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

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
      const { data } = action.payload;
      state.userId = data.id;
      state.login = data.login;
      state.email = data.email;
    },
    setAuthed: (state, action) => {
      const { flag } = action.payload;
      state.isAuthed = flag;
    },
  },
});

export default authSlice.reducer;
export const { setUserData, setAuthed } = authSlice.actions;

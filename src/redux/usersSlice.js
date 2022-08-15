import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersData: [],
  },
  reducers: {
    followToNewUser: (state, action) => {
      const { id } = action.payload;
      state.usersData.map((item) => {
        if (item.id === id) return (item.followed = !item.followed);
        return null;
      });
    },
    setNewUsers: (state, action) => {
      const { users } = action.payload;
      if (users.length === 0) return state;
      state.usersData = users;
    },
  },
});

export default usersSlice.reducer;
export const { followToNewUser, setNewUsers } = usersSlice.actions;

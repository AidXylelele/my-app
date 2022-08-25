import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    selectedPage: 1,
    isFetching: false,
    followRequests: [],
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
    setCurrentPage: (state, action) => {
      const { number } = action.payload;
      state.selectedPage = number;
    },
    setTotalCurrentUsersCount: (state, action) => {
      const { number } = action.payload;
      state.totalUsersCount = number;
    },
    setPreLoader: (state, action) => {
      const { flag } = action.payload;
      state.isFetching = flag;
    },
    setBlockOfButtons: (state, action) => {
      const { id, flag } = action.payload;
      flag
        ? state.followRequests.push(id)
        : (state.followRequests = state.followRequests.filter(
            (item) => item !== id
          ));
    },
  },
});

export default usersSlice.reducer;
export const {
  followToNewUser,
  setNewUsers,
  setCurrentPage,
  setTotalCurrentUsersCount,
  setPreLoader,
  setBlockOfButtons,
} = usersSlice.actions;

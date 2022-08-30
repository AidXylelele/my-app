import { createAction, createSlice } from '@reduxjs/toolkit';
import {
  configForRequests,
  deleteAndPostRequests,
  getRequests,
} from '../api/requestsAPI';

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
      const id = action.payload;
      state.usersData.map((item) => {
        if (item.id === id) return (item.followed = !item.followed);
        return null;
      });
    },
    setNewUsers: (state, action) => {
      const users = action.payload;
      if (users.length === 0) return state;
      state.usersData = users;
    },
    setCurrentPage: (state, action) => {
      const number = action.payload;
      state.selectedPage = number;
    },
    setTotalCurrentUsersCount: (state, action) => {
      const number = action.payload;
      state.totalUsersCount = number;
    },
    setPreLoader: (state, action) => {
      const flag = action.payload;
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

export const getUsersThunkCreator = (selectedPage, pageSize) => (dispatch) => {
  dispatch(setPreloaderAction(true));
  getRequests(configForRequests.usersConfig, [selectedPage, pageSize]).then(
    (response) => {
      dispatch(setPreloaderAction(false));
      dispatch(setNewUsersAction(response.items));
      dispatch(setTotalCurrentUsersCountAction(response.totalCount));
    }
  );
};

export const getBlockBtnThunkCreator = (id, configName) => (dispatch) => {
  dispatch(setBlockOfButtonsAction({ id, flag: true }));
  deleteAndPostRequests(configForRequests[configName], id).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(followToNewUsersAction(id));
      dispatch(setBlockOfButtonsAction({ id, flag: false }));
    }
  });
};

export const setPreloaderAction = createAction('users/setPreLoader');
export const followToNewUsersAction = createAction('users/followToNewUser');
export const setNewUsersAction = createAction('users/setNewUsers');
export const setTotalCurrentUsersCountAction = createAction(
  'users/setTotalCurrentUsersCount'
);
export const setCurrentPageAction = createAction('users/setCurrentPage');
export const setBlockOfButtonsAction = createAction('users/setBlockOfButtons');

export default usersSlice.reducer;
export const {
  followToNewUser,
  setNewUsers,
  setCurrentPage,
  setTotalCurrentUsersCount,
  setPreLoader,
  setBlockOfButtons,
} = usersSlice.actions;

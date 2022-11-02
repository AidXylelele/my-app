import { createAction, createSlice } from '@reduxjs/toolkit';
import {
  configForRequests,
  getRequests,
  putRequests,
} from '../api/requestsAPI';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    postsData: [
      { id: 1, message: 'Hello, world!', likesCount: 12 },
      { id: 2, message: 'It is my second post', likesCount: 11 },
    ],
    profileOfUser: null,
    userStatus: '',
  },
  reducers: {
    addPost: (state, action) => {
      const text = action.payload;
      const newPost = {
        id: 5,
        message: text,
        likesCount: 0,
      };
      state.postsData.push(newPost);
    },
    setUserProfile: (state, action) => {
      const item = action.payload;
      state.profileOfUser = item;
    },
    setUserStatus: (state, action) => {
      const text = action.payload;
      state.userStatus = text;
    },
  },
});

export const addPostAction = createAction('profile/addPost');
export const setUserProfileAction = createAction('profile/setUserProfile');
export const setUserStatusAction = createAction('profile/setUserStatus');

export const getProfileThunkCreator = (userId) => (dispatch) => {
  getRequests(configForRequests.profileConfig, [userId]).then((response) => {
    dispatch(setUserProfileAction(response.data));
  });
};

export const getUserStatusThunkCreator = (userId) => (dispatch) => {
  getRequests(configForRequests.statusConfig, [userId]).then((response) => {
    dispatch(setUserStatusAction(response.data));
  });
};

export const updateUserStatusThunkCreator = (data) => (dispatch) => {
  putRequests(configForRequests.updateStatusConfig, data).then((response) => {
    if (!response.data.data.resultCode) dispatch(setUserStatusAction(data));
  });
};

export default profileSlice.reducer;
export const { addPost, setUserProfile } = profileSlice.actions;

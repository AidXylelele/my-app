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
    newPostText: '',
    profileOfUser: null,
    userStatus: '',
  },
  reducers: {
    updateNewPost: (state, action) => {
      const text = action.payload;
      state.newPostText = text;
    },
    addPost: (state) => {
      const newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      if (state.newPostText === '') return state;
      state.postsData.push(newPost);
      state.newPostText = '';
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

export const updateNewPostAction = createAction('profile/updateNewPost');
export const addPostAction = createAction('profile/addPost');
export const setUserProfileAction = createAction('profile/setUserProfile');
export const setUserStatusAction = createAction('profile/setUserStatus');

export const getProfileThunkCreator = (userId) => (dispatch) => {
  getRequests(configForRequests.profileConfig, [userId ? userId : 25601]).then(
    (response) => {
      dispatch(setUserProfileAction(response));
    }
  );
};

export const getUserStatusThunkCreator = (userId) => (dispatch) => {
  getRequests(configForRequests.statusConfig, [userId ? userId : 25601]).then(
    (response) => {
      dispatch(setUserStatusAction(response));
    }
  );
};

export const updateUserStatusThunkCreator = (data) => (dispatch) => {
  putRequests(configForRequests.updateStatusConfig, data).then((response) => {
    if (!response.data.resultCode) dispatch(setUserStatusAction(data));
  });
};

export default profileSlice.reducer;
export const { updateNewPost, addPost, setUserProfile } = profileSlice.actions;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  configForRequests,
  deleteAndPostRequests,
  getRequests,
  putRequests,
} from '../api/requestsAPI';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    postsData: [],
    profileOfUser: null,
    userStatus: '',
  },
  reducers: {
    addPost: (state, action) => {
      const post = action.payload;
      state.postsData.push(post);
    },
    setUserProfile: (state, action) => {
      const item = action.payload;
      state.profileOfUser = item;
    },
    setUserPosts: (state, action) => {
      const posts = action.payload;
      state.postsData = posts;
    },
    setUserStatus: (state, action) => {
      const text = action.payload;
      state.userStatus = text;
    },
  },
});

export const getProfileThunk = (userId) => (dispatch) => {
  getRequests(configForRequests.profileConfig, [userId])
    .then((response) => {
      if (!response.resultCode) dispatch(setUserProfile(response.user));
    })
    .then(() => dispatch(getUserPostsThunk(userId)));
};

export const getUserStatusThunk = (userId) => (dispatch) => {
  getRequests(configForRequests.statusConfig, [userId]).then((response) => {
    dispatch(setUserStatus(response));
  });
};

export const updateUserStatusThunk = (data, userId) => (dispatch) => {
  putRequests(configForRequests.updateStatusConfig, userId, data).then(
    (response) => {
      if (!response.resultCode) dispatch(setUserStatus(data));
    }
  );
};

export const getUserPostsThunk = (userId) => (dispatch) => {
  getRequests(configForRequests.getPostsConfig, [userId]).then((response) => {
    if (!response.resultCode) dispatch(setUserPosts(response.posts));
  });
};

export const createUserPostThunk = (data, userId) => (dispatch) => {
  deleteAndPostRequests(
    configForRequests.createPostConfig,
    [userId],
    data
  ).then((response) => {
    if (!response.resultCode) {
      console.log(response);
      dispatch(addPost(response.data.post));
    }
  });
};

export default profileSlice.reducer;
export const { addPost, setUserProfile, setUserPosts, setUserStatus } =
  profileSlice.actions;

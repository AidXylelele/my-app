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
    updatePost: (state, action) => {
      const updatePost = action.payload;
      state.postsData = state.postsData.map((post) => {
        if (post.post_id === updatePost.post_id) return (post = updatePost);
        return post;
      });
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
      dispatch(addPost(response.data.post));
    }
  });
};

export const updateUserPostThunk = (post_id, message) => (dispatch) => {
  putRequests(configForRequests.updatePostConfig, post_id, message).then(
    (response) => {
      console.log(response);
      if (!response.resultCode) dispatch(updatePost({ message, post_id }));
    }
  );
};

export default profileSlice.reducer;
export const {
  addPost,
  updatePost,
  setUserProfile,
  setUserPosts,
  setUserStatus,
} = profileSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
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
    userSkills: '',
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
    deletePost: (state, action) => {
      const deletedPost = action.payload;
      state.postsData = state.postsData.filter(
        (post) => post.post_id !== deletedPost
      );
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
    setUserSkills: (state, action) => {
      const text = action.payload;
      state.userSkills = text;
    },
  },
});

export const userAction = {
  getProfileThunk: (userId) => (dispatch) => {
    getRequests(configForRequests.profileConfig, [userId])
      .then((response) => {
        if (!response.resultCode) dispatch(setUserProfile(response.user));
      })
      .then(() => dispatch(userAction.getUserPostsThunk(userId)));
  },

  getUserStatusThunk: (userId) => (dispatch) => {
    getRequests(configForRequests.statusConfig, [userId]).then((response) => {
      dispatch(setUserStatus(response));
    });
  },

  updateUserStatusThunk: (data, userId) => (dispatch) => {
    putRequests(configForRequests.updateStatusConfig, userId, data).then(
      (response) => {
        if (!response.resultCode) dispatch(setUserStatus(data));
      }
    );
  },

  getUserSkillsThunk: (userId) => (dispatch) => {
    getRequests(configForRequests.skillsConfig, [userId]).then((response) => {
      dispatch(setUserSkills(response));
    });
  },

  updateUserSkillsThunk: (data, userId) => (dispatch) => {
    putRequests(configForRequests.updateSkillsConfig, userId, data).then(
      (response) => {
        if (!response.resultCode) dispatch(setUserSkills(data));
      }
    );
  },

  getUserPostsThunk: (userId) => (dispatch) => {
    getRequests(configForRequests.getPostsConfig, [userId]).then((response) => {
      if (!response.resultCode) dispatch(setUserPosts(response.posts));
    });
  },

  createUserPostThunk: (data, userId) => (dispatch) => {
    deleteAndPostRequests(
      configForRequests.createPostConfig,
      userId,
      data
    ).then((response) => {
      if (!response.resultCode) {
        dispatch(addPost(response.data.post));
      }
    });
  },

  updateUserPostThunk: (post_id, message) => (dispatch) => {
    putRequests(configForRequests.updatePostConfig, [post_id], message).then(
      (response) => {
        if (!response.resultCode) dispatch(updatePost({ message, post_id }));
      }
    );
  },

  deleteUserPostThunk: (post_id) => (dispatch) => {
    deleteAndPostRequests(configForRequests.deletePostConfig, post_id).then(
      (response) => {
        if (!response.resultCode) {
          console.log(response);
          dispatch(deletePost(response.data.post.post_id));
        }
      }
    );
  },
};

export default profileSlice.reducer;
export const {
  addPost,
  updatePost,
  deletePost,
  setUserProfile,
  setUserPosts,
  setUserStatus,
  setUserSkills,
} = profileSlice.actions;

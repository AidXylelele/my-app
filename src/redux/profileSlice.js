import { createAction, createSlice } from '@reduxjs/toolkit';
import { configForRequests, usersRequests } from '../api/requestsAPI';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    postsData: [
      { id: 1, message: 'Hello, world!', likesCount: 12 },
      { id: 2, message: 'It is my second post', likesCount: 11 },
    ],
    newPostText: '',
    profileOfUser: null,
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
  },
});

export const updateNewPostAction = createAction('profile/updateNewPost');
export const addPostAction = createAction('profile/addPost');
export const setUserProfileAction = createAction('profile/setUserProfile');

export const getProfileThunkCreator = (userId) => (dispatch) => {
   usersRequests(configForRequests.profileConfig, [userId ? userId : 2]).then(
     (response) => {
       dispatch(setUserProfileAction(response));
     }
   );
};

export default profileSlice.reducer;
export const { updateNewPost, addPost, setUserProfile } = profileSlice.actions;

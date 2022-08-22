import { createSlice } from '@reduxjs/toolkit';

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
      const { newText } = action.payload;
      state.newPostText = newText;
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
      const { item } = action.payload;
      state.profileOfUser = item;
    },
  },
});

export default profileSlice.reducer;
export const { updateNewPost, addPost, setUserProfile } = profileSlice.actions;

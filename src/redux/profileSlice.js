import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'dialogs',
  initialState: {
    postsData: [
      { id: 1, message: 'Hello, world!', likesCount: 12 },
      { id: 2, message: 'It is my second post', likesCount: 11 },
    ],
    newPostText: '',
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
  },
});

export default profileSlice.reducer;
export const { updateNewPost, addPost } = profileSlice.actions;

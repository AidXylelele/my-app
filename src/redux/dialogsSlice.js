import { createSlice } from '@reduxjs/toolkit';

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: {
    newMessageBody: '',
    messagesData: [
      { id: 1, message: 'Hello' },
      { id: 2, message: 'How are you?' },
      { id: 3, message: 'Good!' },
    ],
    dialogsData: [
      { id: 1, name: 'Dima' },
      { id: 2, name: 'Alex' },
      { id: 3, name: 'Dasha' },
    ],
  },
  reducers: {
    updateNewMessage: (state, action) => {
      const { body } = action.payload;
      state.newMessageBody = body;
    },
    sendMessage: (state) => {
      const body = state.newMessageBody;
      if (body === '') return state;
      state.newMessageBody = '';
      state.messagesData.push({ id: 6, message: body });
    },
  },
});

export default dialogsSlice.reducer;
export const { updateNewMessage, sendMessage } = dialogsSlice.actions;

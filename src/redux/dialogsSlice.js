import { createAction, createSlice } from '@reduxjs/toolkit';

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
    sendMessage: (state, action) => {
      const body = action.payload;
      state.messagesData.push({ id: 6, message: body });
    },
  },
});

export const sendMessageAction = createAction('dialogs/sendMessage');

export default dialogsSlice.reducer;
export const { sendMessage } = dialogsSlice.actions;

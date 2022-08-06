import { createAction, createSlice } from '@reduxjs/toolkit';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

export const updateNewMessageAction = (text) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: text,
});

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
      state.newMessageBody = action.payload.body;
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

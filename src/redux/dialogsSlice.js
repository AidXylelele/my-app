import { createSlice } from '@reduxjs/toolkit';
import { configForRequests, getRequests } from '../api/requestsAPI';

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: {
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
    setDialogs: (state, action) => {
      const { dialogs } = action.payload;
      state.dialogsData = dialogs;
    },
    sendMessage: (state, action) => {
      const body = action.payload;
      state.messagesData.push({ id: 6, message: body });
    },
  },
});

export const getDialogsThunkCreator = (user_id) => (dispatch) => {
  // dispatch(setPreloaderAction(true));

  getRequests(configForRequests.getDialogsConfig, [user_id]).then(
    (response) => {
      console.log(response);
      // dispatch(setPreloaderAction(false));
    }
  );
};

export default dialogsSlice.reducer;
export const { sendMessage } = dialogsSlice.actions;

// import { createAction, createReducer } from '@reduxjs/toolkit';
// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
// const SEND_MESSAGE = 'SEND-MESSAGE';

// const initialState = {
//   newMessageBody: '',
//   messagesData: [
//     { id: 1, message: 'Hello' },
//     { id: 2, message: 'How are you?' },
//     { id: 3, message: 'Good!' },
//   ],
//   dialogsData: [
//     { id: 1, name: 'Dima' },
//     { id: 2, name: 'Alex' },
//     { id: 3, name: 'Dasha' },
//   ],
// };

// const dialogsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_NEW_MESSAGE_BODY:
//       return {
//         ...state, newMessageBody: action.body
//       };
//     case SEND_MESSAGE:
//       const body = state.newMessageBody;
//       if (body === '') return state;
//       return {
//         ...state,
//         newMessageBody: '',
//         messagesData: [state.messagesData.push({ id: 6, message: body })],
//       };
//     default:
//       return state;
//   }
// };

// export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

// export const updateNewMessageBodyActionCreator = (text) => ({
//   type: UPDATE_NEW_MESSAGE_BODY,
//   body: text,
// });

// export default dialogsReducer;

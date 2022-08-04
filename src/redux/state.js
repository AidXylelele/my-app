import { root } from '../index';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sideBarReducer from './sideBarReducer';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

export const store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: 'Hello, world!', likesCount: 12 },
        { id: 2, message: 'It is my second post', likesCount: 11 },
      ],
      newPostText: '',
    },
    dialogsPage: {
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
    sideBar: {},
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sideBar = sideBarReducer(this._state.sideBar, action);
    this._callSubscriber(root, store);
  },
  _callSubscriber() {},
  subscriber(observer) {
    this._callSubscriber = observer;
  },
};

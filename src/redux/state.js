import { root } from '../index';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    if (action.type === 'ADD-POST') {
      const newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };
      if (this._state.profilePage.newPostText === '') return;
      this._state.profilePage.postsData.push(newPost);
      this._state.profilePage.newPostText = '';
      this._callSubscriber(root, store);
    } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(root, store);
    }
  },
  _callSubscriber() {},
  subscriber(observer) {
    this._callSubscriber = observer;
  },
};

export const addPostActionCreator = () => {
  return {
    type: ADD_POST,
  };
};

export const updateNewPostActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  };
};

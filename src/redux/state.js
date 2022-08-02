import { root } from '../index';

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
  _callSubscriber() {},
  addPost() {
    const newPost = {
      id: 5,
      message: this._state.profilePage.newPostText,
      likesCount: 0,
    };
    if (this._state.profilePage.newPostText === '') return;
    this._state.profilePage.postsData.push(newPost);
    this._state.profilePage.newPostText = '';
    this._callSubscriber(root, store);
  },
  updateNewPostChange(newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(root, store);
  },
  subscriber(observer) {
    this._callSubscriber = observer;
  },
};

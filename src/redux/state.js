import { root } from "../index";

let renderEntireTree = () => { };

export const state = {
    profilePage: {
        postsData: [
            { id: 1, message: "Hello, world!", likesCount: 12 },
            { id: 2, message: "It is my second post", likesCount: 11 },
        ],
        newPostText: '',
    },
    dialogsPage: {
        messagesData: [
            { id: 1, message: "Hello" },
            { id: 2, message: "How are you?" },
            { id: 3, message: "Good!" },
        ],
        dialogsData: [
            { id: 1, name: "Dima" },
            { id: 2, name: "Alex" },
            { id: 3, name: "Dasha" },
        ],
    }
};

export const addPost = () => {
    const newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0,
    }
    if (state.profilePage.newPostText === '') return;
    state.profilePage.postsData.push(newPost);
    state.profilePage.newPostText = '';
    renderEntireTree(root, state, addPost, updateNewPostChange);
};

export const updateNewPostChange = (newText) => {
    state.profilePage.newPostText = newText;
    renderEntireTree(root, state, addPost, updateNewPostChange);
};

export const subscriber = (observer) => {
    renderEntireTree = observer;
};
import { renderEntireTree, root } from "../render";

export const state = {
    profilePage: {
        postsData: [
            { id: 1, message: "Hello, world!", likesCount: 12 },
            { id: 2, message: "It is my second post", likesCount: 11 },
        ],
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

export const addPost = (postMessage) => {
    const newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0,
    }
    state.profilePage.postsData.push(newPost);
    renderEntireTree(root, state, addPost);
}

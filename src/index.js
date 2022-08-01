import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { state, addPost, updateNewPostChange, subscriber } from './redux/state';


export const root = ReactDOM.createRoot(document.getElementById('root'));
const renderEntireTree = (root, state, addPost, updateNewPostChange) => {
    root.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} updateNewPostChange={updateNewPostChange} />
        </React.StrictMode>
    );
}

renderEntireTree(root, state, addPost, updateNewPostChange);

subscriber(renderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

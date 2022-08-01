import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const root = ReactDOM.createRoot(document.getElementById('root'));
export const renderEntireTree = (root, state, addPost) => {
    root.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} />
        </React.StrictMode>
    );
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const postData = [
  { id: 1, message: "Hello, world!", likesCount: 12 },
  { id: 2, message: "It is my second post", likesCount: 11 },
];

const dialogsData = [
  { id: 1, name: "Dima" },
  { id: 2, name: "Alex" },
  { id: 3, name: "Dasha" },
];

const messagesData = [
  { id: 1, message: "Hello" },
  { id: 2, message: "How are you?" },
  { id: 3, message: "Good!" },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App postData={postData} messagesData={messagesData} dialogsData={dialogsData} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

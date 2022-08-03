import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/state';

export const root = ReactDOM.createRoot(document.getElementById('root'));
const renderEntireTree = (root, store) => {
  root.render(
    <React.StrictMode>
      <App
        store={store}
        state={store.getState()}
        dispatch={store.dispatch.bind(store)}
      />
    </React.StrictMode>
  );
};

renderEntireTree(root, store);

store.subscriber(renderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

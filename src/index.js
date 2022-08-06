import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/redux-store';
import { Provider } from 'react-redux';

export const root = ReactDOM.createRoot(document.getElementById('root'));

const renderEntireTree = (root, store) => {
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App store={store} />
      </React.StrictMode>
    </Provider>
  );
};

renderEntireTree(root, store);

store.subscribe(() => {
  renderEntireTree(root, store);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

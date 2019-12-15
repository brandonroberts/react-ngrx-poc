import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import App from './App';
import store from './state';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store as any}>
    <App />
  </Provider>,
  rootElement
);
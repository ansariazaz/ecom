import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './Redux/store';
import { Provider } from 'react-redux'
import {positions,transitions,Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const root = ReactDOM.createRoot(document.getElementById('root'));
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}
root.render(
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
          <App />
      </AlertProvider>
    </Provider>
);



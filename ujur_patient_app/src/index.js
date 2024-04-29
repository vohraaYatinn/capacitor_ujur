import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/css/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './redux/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { App as CapacitorApp } from '@capacitor/app';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if(!canGoBack){
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
  });
root.render(
  <Provider store={Store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

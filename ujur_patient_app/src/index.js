import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/css/style.css';
import '../src/css/styleForPrescription.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './redux/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { App as CapacitorApp } from '@capacitor/app';
import { Provider } from 'react-redux';
import { Plugins } from '@capacitor/core';

const { Permissions } = Plugins;

const root = ReactDOM.createRoot(document.getElementById('root'));
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});


// async function requestPermissions() {
//   const { results } = await Permissions.request({
//     permissions: ['android.permission.WRITE_EXTERNAL_STORAGE', 'android.permission.READ_EXTERNAL_STORAGE'],
//   });
//   console.log(results);
// }
// requestPermissions();

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

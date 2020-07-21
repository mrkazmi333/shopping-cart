import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import 'firebase/firestore';


 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyBy4XUU32UGv72iIZpnzO_OH0wBTVPSJLE",
  authDomain: "cart-9f9ff.firebaseapp.com",
  databaseURL: "https://cart-9f9ff.firebaseio.com",
  projectId: "cart-9f9ff",
  storageBucket: "cart-9f9ff.appspot.com",
  messagingSenderId: "850847286401",
  appId: "1:850847286401:web:9e763cd4ac59a41ad7b980"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



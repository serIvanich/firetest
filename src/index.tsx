import React, { createContext, useContext, useEffect, useState  } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


//TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG9Xy34YAZNatV7NWGF5zs10nIdzy2jZI",
  authDomain: "firetest-eb312.firebaseapp.com",
  projectId: "firetest-eb312",
  storageBucket: "firetest-eb312.appspot.com",
  messagingSenderId: "241217009764",
  appId: "1:241217009764:web:6e5af11112ced70c464771",
  measurementId: "G-VDFBJSWPBR"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
console.log(app, auth)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const Context = createContext(null) as any

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{app, auth}}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

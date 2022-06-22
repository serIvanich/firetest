import React from 'react';
import s from './App.module.css';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/Navbar';


function App() {

  return (
    <div className={s.App}>
       <Navbar/>
       <AppRouter/>
    </div>
  );
}

export default App;

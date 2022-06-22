import React, { useState } from 'react';
import s from './App.module.css';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/Navbar';


function App() {
  const [onLogin, setOnLogin] = useState<boolean>(false)

  return (
    <div className={s.App}>
       <Navbar onLogin={onLogin} setOnLogin={setOnLogin}/>
       <AppRouter onLogin={onLogin} setOnLogin={setOnLogin}/>
    </div>
  );
}

export default App;

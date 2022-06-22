import React, { useState } from 'react';
import s from './App.module.css';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/Navbar';


function App() {
  const [onLogin, setOnLogin] = useState<boolean>(false)

  return (
    <div className={s.App}>
       <Navbar onLogin={onLogin}/>
       <AppRouter onLogin={onLogin} setPrivat={setOnLogin}/>
    </div>
  );
}

export default App;

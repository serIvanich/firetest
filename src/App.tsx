import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useUserContext } from '.';
import s from './App.module.css';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/Navbar';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function App() {
  const {auth, db} = useUserContext()
  const [user] = useAuthState(auth)
  const [values, loading, error, snapshot] = useCollectionData();
  const [userName, setUserName] = useState<string | null>(null)
  const [onLogin, setOnLogin] = useState<boolean>(false)
  useEffect(() => {
    if(user) {
      if (user.displayName===null){
        setUserName(user.email)
      }else{
        setUserName(user.displayName)
      }
      setOnLogin(true)
    }
  },[user])
  const setLogout = () => {
    setOnLogin(false)
    setUserName('no login')
  }
  if (loading) {
    return <div>loading</div>
  }
  return (
    <div className={s.App}>
       <Navbar onLogin={onLogin} setLogout={setLogout} userName={userName}/>
       <AppRouter onLogin={onLogin} setOnLogin={setOnLogin}/>
    </div>
  );
}

export default App;

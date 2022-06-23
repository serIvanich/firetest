import { Button, Container, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '..';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth'; 

export const PrivatPage: React.FC<PrivatPagePropsType> = () => {
  const [text, setText] = useState('')
  const {auth,db} = useUserContext()
  const [user] = useAuthState(auth)

  let userName = 'noName'
  if (user && user.displayName) {
    userName =  user.displayName
  }
  
  const navigate = useNavigate()

  const changeTextInput = (e: any) => {
    
   setText(e.target.value)
  }
  const goToMain = () => {
    navigate('/')
  }
  const addMessage = () => {
    
    addMessageDB()
    goToMain()
  }
  
 

  const addMessageDB =  async () => {
    const newDoc = {
      user: userName,
      text: text,
      timestamp: serverTimestamp(),
    }
    const docInf = await addDoc(collection(db, 'messages'), newDoc);
    try{
      console.log('ok')
    }
    catch {
      console.log('error')
    }
  }
  return (
    <Container maxWidth="sm" >
      <Grid container
      justifyContent='center'
      style={{marginTop: '0.5vh', height: '92vh',  backgroundColor: '#cfe8fc' }}>

          <Grid item>
            <Button onClick={goToMain}>
              go to main
            </Button>
          </Grid>
      

          <Grid container spacing={1} alignItems='center' justifyContent='center'
          >
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField id='input-with-icon-grid' label='text message' onChange={changeTextInput} />
              </Grid>
          
          </Grid>

          <Grid item>
            <Button onClick={addMessage}>
              add message
            </Button>
          </Grid>
      </Grid>
     
    </Container>
  )
}

type PrivatPagePropsType = {
 
}
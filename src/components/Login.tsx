import { Box, Button, Container, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const Login: React.FC<LoginPropsType> = ({setPrivat}) => {
  const navigate = useNavigate()
  const {auth} = useContext(Context)
 

  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log('login', user)
               setPrivat(true)
               navigate('/')
                // redux action? --> dispatch({ type: SET_USER, user });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
   
  };

  return (
    <Container>
      <Grid container
      style={{height: window.innerHeight - 50}}
        alignContent={'center'}
        justifyContent={'space-around'}
      >
          <Grid container
               style={{width:350, marginTop: 20, padding: 10, background: 'lightgray'}}
               direction={'column'}
                alignContent={'center'}

          >
              <Box p={3}>
              <Button variant={'outlined'} onClick={handleGoogleSignIn}>enter with Google</Button>
                </Box>
          </Grid>
          <Grid container
               style={{width:350, marginTop: 20, padding: 10, background: 'lightgray'}}
               direction={'column'}
                alignItems='center'
          >
              <Box p={3}>
              <Button variant={'outlined'}>enter with password</Button>
                </Box>
          </Grid>
      
      </Grid>
      
    </Container>
  )
}

type LoginPropsType = {
  setPrivat: (privat: boolean) => void
}

import { Box, Button, Container, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "..";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const Login: React.FC<LoginPropsType> = ({setOnLogin}) => {
  const navigate = useNavigate()
  const {auth} = useUserContext()
 

  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider)
            .then((result) => {
                
                const user = result.user;
               
                setOnLogin(true)
                navigate('/')
               
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
  setOnLogin: (onLogin: boolean) => void
}

import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "..";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useFormik } from "formik";

export const Login: React.FC<LoginPropsType> = ({setOnLogin}) => {
  const [loginWithPassword, setLoginWithPassport] = useState(false)
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

  const handleEmailPasswordSignIn = async (value: any) => {
   
  }

  const handleLinkToSignIn = () => {
    setLoginWithPassport(true)
  }

  return (
    <Container>
      <Grid container
        style={{height: window.innerHeight - 50}}
        alignContent={'center'}
        justifyContent={'space-around'}
      >
        
        { loginWithPassword 
            ?  <LoginForm handleEmailPasswordSignIn={handleEmailPasswordSignIn}
                          setLoginWithPassport={setLoginWithPassport}
              />
             
            : <Grid container
               style={{width:350, minHeight: 250,
                       marginTop: 20, padding: 10, background: 'lightgray'}}
               direction={'column'}
                alignItems={'center'}
                justifyContent={'space-around'}

          >
        
            <Grid item>
              <Button variant={'contained'} color={'primary'} onClick={handleGoogleSignIn}>enter with Google</Button>
            </Grid>
            <Grid item
                  style={{fontSize: '2.3em'}}
            >
               or
            </Grid>
            <Grid item>
            <Button variant={'contained'}
                    color={'primary'} 
                    onClick={handleLinkToSignIn}>
                enter your Email and Password
            </Button>
            </Grid>
            
          </Grid>
        }
         

               
      </Grid>
      
    </Container>
  )
}

const LoginForm: React.FC<LoginFormPropsType> = ({setLoginWithPassport, handleEmailPasswordSignIn}) => {
  
  const goBack = () => {
    setLoginWithPassport(false)
  }
  const formik = useFormik<FormValuesType>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
  },
  validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
          errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
      }
      if (!values.password) {
          errors.password = 'Required'
      } else if (values.password.length <= 2) {
          errors.password = 'password may be biggest 2 simbol'
      }
      return errors;
  },
    onSubmit: values => {
       console.log(values)
      //  handleEmailPasswordSignIn(values)
    },
  })
  return (
    <Grid container 
          style={{width:350, minHeight: 350,
                  padding: 10, background: 'lightgray'}}
          direction={'column'}
          alignItems={'center'}
          justifyContent={'space-between'}>
        <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={''}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                          
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            {...formik.getFieldProps('rememberMe')}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                    <FormLabel>
                      <p style={{marginTop: 30, cursor: 'pointer'}} 
                        onClick={goBack}>go back</p>
                    </FormLabel>
                </FormControl>
            </form>
        </Grid>
    </Grid>

  )
}

type LoginPropsType = {
  setOnLogin: (onLogin: boolean) => void
}

type LoginFormPropsType = {
  setLoginWithPassport: (value: boolean) => void
  handleEmailPasswordSignIn: (value: any) => Promise<void>
}


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}
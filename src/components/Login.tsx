import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "..";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { MAIN_ROUTE, REGISTER_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";

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
    const auth = getAuth()
    const {email, password} = value
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    console.log(userCredential)
    const user = userCredential.user;
    navigate(MAIN_ROUTE)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
   
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
      handleEmailPasswordSignIn(values)
    },
  })
  return (
    <Grid container 
          style={{width:350, minHeight: 350,
                  padding: '10px 50px', background: 'lightgray'}}
          direction={'column'}
          alignItems={'center'}
          justifyContent={'space-between'}>
        <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>for log in enter :</p>
                        <p>Email: your register email</p>
                        <p>Password: your password</p>

                        <p>if you have not registered click
                            <Link to={REGISTER_ROUTE}> here </Link>
                        </p>
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

                       
                        <Button type={'submit'} variant={'contained'} 
                                color={'primary'} style={{marginTop: 30}}>Login</Button>
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
}
type FormValuesType = {
    email: string
    password: string
}
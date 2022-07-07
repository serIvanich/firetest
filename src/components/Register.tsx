import { Button, Container, FormControl, FormGroup, FormLabel, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const auth = getAuth();

  const goMain = () => {
    navigate( MAIN_ROUTE)
  }

  const handleRegisterUserWithPassword = async(values: any) => {
    const {email, password, passwordRepeat} = values
    if(password === passwordRepeat) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        console.log( userCredential.user)
        goMain()
        //const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
  }


  const formik = useFormik<FormValuesType>({
    initialValues: {
      email: '',
      password: '',
      passwordRepeat: '',
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
      if (!values.passwordRepeat) {
        errors.passwordRepeat = 'Required'
    } else if (values.password.length <= 2) {
        errors.passwordRepeat = 'password may be biggest 2 simbol'
    }

      return errors;
  },
    onSubmit: values => {
       console.log(values)
       handleRegisterUserWithPassword(values)
    },
  })

 
 
  return (
    <Grid container justifyContent='center' alignContent='center'
    style={{height: window.innerHeight - 70}}
    >


    <Grid container 
          style={{width:350, minHeight: 350,
                  padding: '50px 10px', background: 'lightgray'}}
          direction={'column'}
          alignItems={'center'}
          justifyContent={'space-between'}>
        <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>for register enter :</p>
                        <p>Email: your register email</p>
                        <p>Password: your password</p>

        
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

                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                          
                            {...formik.getFieldProps('passwordRepeat')}
                        />
                        {formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
                        <div style={{color: 'red'}}>{formik.errors.passwordRepeat}</div>}
                       
                        <Button type={'submit'} variant={'contained'} 
                                color={'primary'} style={{marginTop: 30}}>register</Button>
                    </FormGroup>
                    <FormLabel>
                      <p style={{marginTop: 30, cursor: 'pointer'}} 
                        onClick={goMain}>go to main page</p>
                    </FormLabel>
                </FormControl>
            </form>
        </Grid>
    </Grid>

    </Grid>
  )
}

type FormikErrorType = {
  email?: string
  password?: string
  passwordRepeat?: string
}
type FormValuesType = {
  email: string
  password: string
  passwordRepeat: string
}

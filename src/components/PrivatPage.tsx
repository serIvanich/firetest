import { Button, Container, Grid, TextField } from '@material-ui/core';
import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useNavigate } from 'react-router-dom';

export const PrivatPage: React.FC<PrivatPagePropsType> = () => {
  const navigate = useNavigate()
  const clickToMain = () => {
    navigate('/')
  }
  
  return (
    <Container maxWidth="sm" >
      <Grid container
      justifyContent='center'
      style={{marginTop: '0.5vh', height: '92vh',  backgroundColor: '#cfe8fc' }}>

      <Grid container spacing={1} alignItems='center' justifyContent='center'
        >
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id='input-with-icon-grid' label='With a grid' />
          </Grid>
          
        </Grid>

      <Grid item>
            <Button onClick={clickToMain}>
              go to main
            </Button>
          </Grid>
      </Grid>
     
    </Container>
  )
}

type PrivatPagePropsType = {
 
}
import { Container, Grid, TextField } from '@material-ui/core';
import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';

export const PrivatPage: React.FC<PrivatPagePropsType> = () => {
  
  return (
    <Container maxWidth="sm" >
     <Grid container spacing={1} alignItems='center' justifyContent='center'
        style={{marginTop: '1vh', height: '90vh',  backgroundColor: '#cfe8fc' }}>
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id='input-with-icon-grid' label='With a grid' />
          </Grid>
        </Grid>
    </Container>
  )
}

type PrivatPagePropsType = {
 
}
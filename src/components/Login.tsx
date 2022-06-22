import { Box, Button, Container, Grid } from "@material-ui/core";
import React from "react";

export const Login: React.FC = () => {

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
              <Button variant={'outlined'}>enter with Google</Button>
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
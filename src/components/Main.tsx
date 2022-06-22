import { Button, Container, Grid } from "@material-ui/core";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PRIVAT_PAGE_ROUTE } from "../utils/consts";

export const Main: React.FC<MainPropsType> = ({onLogin}) => {
  const navigate = useNavigate()
  const enterForPrivat = () => {
    onLogin ? navigate(PRIVAT_PAGE_ROUTE)
          : navigate('/login')
  }

  return (
    <Container  style={{marginTop: '0.5vh', height: '92vh',  backgroundColor: '#cfe8fc' }}>
      <Grid container
            justifyContent={'center'}
            alignItems={'center'}
            style={{height: '100%'}}
      >
          <Button onClick={enterForPrivat}>
            ONLY FOR REGISTER USER 
          </Button>

      </Grid>
    </Container>
  )
}

type MainPropsType =  {
  onLogin: boolean
}
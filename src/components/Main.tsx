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
    <Container>
      <Grid container
            justifyContent={'center'}
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
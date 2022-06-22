import { Container, Grid } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { PRIVAT_PAGE_ROUTE } from "../utils/consts";

export const Main: React.FC = () => {

  return (
    <Container>
      <Grid container
            justifyContent={'center'}
      >
          <NavLink to={PRIVAT_PAGE_ROUTE}>
            ONLY FOR REGISTER USER 
          </NavLink>

      </Grid>
    </Container>
  )
}

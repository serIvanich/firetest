import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";


import React from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

export const Navbar: React.FC = () => {
  const user = false
  return (
    <AppBar position="static">
  <Toolbar>
    <Grid>
        {user ?  <Button color="inherit" >Enter</Button>
              :  
                <NavLink to={LOGIN_ROUTE}
                         style={{textDecoration:'none', backgroundColor: 'lightblue'}}> 
                  <Button color="inherit" >Login</Button> 
                </NavLink>
        }
    </Grid>
   
  </Toolbar>
</AppBar>
  )
}

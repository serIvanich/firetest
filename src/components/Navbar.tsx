import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";


import React from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

export const Navbar: React.FC<NavbarPropsType> = ({onLogin}) => {
  
  return (
    <AppBar position="static">
  <Toolbar>
    <Grid>
        {onLogin ?  <Button color="inherit" >logout</Button>
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

type NavbarPropsType = {
  onLogin: boolean
}

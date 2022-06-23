import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { signOut } from 'firebase/auth';
import { useUserContext } from "..";




export const Navbar: React.FC<NavbarPropsType> = ({onLogin, setOnLogin}) => {
  const {auth} = useUserContext()
  const logout = () => {
    signOut(auth)
    .then(() => {
  
        setOnLogin(false)
       
    })
    .catch((error) => {
        console.log(error);
    });
  }
  return (
    <AppBar position="static">
  <Toolbar>
    <Grid>
        {onLogin ?  <Button color="inherit" onClick={logout} >logout</Button>
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
  setOnLogin: (onLogin: boolean) => void
}

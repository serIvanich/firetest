import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { signOut } from 'firebase/auth';
import { useUserContext } from "..";




export const Navbar: React.FC<NavbarPropsType> = ({userName, onLogin, setLogout}) => {
  const {auth} = useUserContext()
  const logout = () => {
    signOut(auth)
    .then(() => {
  
        setLogout()
       
    })
    .catch((error) => {
        console.log(error);
    });
  }
  return (
    <AppBar position="static">
  <Toolbar>
    <Grid container
          justifyContent={'space-between'}
          alignItems={'center'}
    >
      <Grid item>
        {onLogin ?  <Button color="inherit" onClick={logout} >logout</Button>
                 :  <NavLink to={LOGIN_ROUTE}
                             style={{textDecoration:'none', backgroundColor: 'lightblue'}}
                    > 
                        <Button color="inherit" >Login</Button> 
                    </NavLink>
        }

      </Grid>
      <Grid item>
        {userName}
      </Grid>
    </Grid>
   
  </Toolbar>
</AppBar>
  )
}

type NavbarPropsType = {
  userName: string | null
  onLogin: boolean
  setLogout: () => void
}

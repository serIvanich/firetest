import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, PRIVAT_PAGE_ROUTE, REGISTER_ROUTE } from "../utils/consts";
import { Login } from "./Login";
import { Main } from "./Main";
import { PrivatPage } from "./PrivatPage";
import { Register } from "./Register";

export const AppRouter: React.FC<AppRouterPropsType> = ({onLogin, setOnLogin}) => {

  return (
    <Routes>
       <Route path='/' element={<Main  onLogin={onLogin}/>} />
       <Route path={REGISTER_ROUTE} element={<Register />}/>
       <Route path={PRIVAT_PAGE_ROUTE} element={<PrivatPage />}/>
       <Route path={LOGIN_ROUTE} element={<Login setOnLogin={setOnLogin}/>} />
       
    </Routes>
  ) 
}

type AppRouterPropsType = {
  onLogin: boolean
  setOnLogin: (onLogin: boolean) => void
}

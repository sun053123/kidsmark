import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../context/auth';

//if we have user will redirect to "/" if we not use the props that we send 
//in this case we goin to protect Login page casue user who logedin can't login twice! (and Register)

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  console.log(Component)

  return (
    <Outlet
      {...rest}
      render={(props) =>
        user ? <Navigate to="/" /> 
        : Navigate(<Component {...props} />)
      }
    />
  );
}

export default AuthRoute;

{/* <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> 
        : <Component {...props} />
      }
    /> */} // react router v5
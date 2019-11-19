import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './App/Components/Navbar'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Home from './App/Screens/Home/Home'
import Profile from './App/Screens/Profile/Profile';
import NotFound from './App/Screens/NotFound/NotFound';
import {useUser} from './App/Authentication/user-context';
import {useAuth} from './App/Authentication/auth-context';
import SignUp from './App/Screens/Auth/SignUp';
import Login from './App/Screens/Auth/Login';
import Facility from './App/Screens/Facility/index';

import './App.css';

function App(props) {
  console.log("userObj", useUser().user)

  return (
    <div id="root2">
      <ThemeProvider theme={theme}>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <PrivateRoute exact path='/profile' component={Profile} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route path='/facility/:value' component={Facility} />
        <Route component={NotFound} />
      </Switch>
      </ThemeProvider>
  </div>
  );
}

const PrivateRoute = ({ component, path, ...options }) => {
  const userObj = useUser().user;
  const {authenticate} = useAuth() // used to force authentication and redirect to correct page

  const isAuth = userObj.isAuth; // true if authenticated, false otherwise

  if (!isAuth) {

    // Force authentication and once authentication is complete redirect to the private route
    return authenticate(path);
  }

  // At this point user is authenticated
  return <Route {...options} path={path} component={component} />;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4182eb"
    },
  }
})

export default App;

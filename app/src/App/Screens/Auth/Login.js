import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Snackbar } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Popup from '../../Components/Popup';
import PropTypes from 'prop-types';
import Loading from '../../Components/Loading';
import queryString from 'query-string';

import '../../stylesheets/Auth.css';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function Login(props) {
  const classes = useStyles(); // material-ui
  const [popupState, setPopupState] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState('');

  // Hide Navbar & Set all height requirements
  useEffect(() => {
    var navbar = document.getElementById('navbarTop');
    var htmlTag = document.getElementsByTagName('html')[0];
    console.log("html tag", htmlTag);
    htmlTag.style.minHeight = '100%';

    var bodyTag = document.getElementsByTagName('body')[0];
    bodyTag.style.minHeight = '100vh';

    var rootTag = document.getElementById('root');
    rootTag.style.height = '100vh';

    var rootTag2 = document.getElementById('root2');
    rootTag2.style.height = '100vh';

    navbar.style.display = 'none';
    console.log("navbar", navbar);

  }, [])

  // set redirect
  useEffect(() => {
    const urlObj = queryString.parse(props.location.search);

    if (urlObj.redirectUri) {
      setRedirect(urlObj.redirectUri);
    }
  }, [props.location.search])

  return (
    <div className="row h-100 no-gutters">
      {renderPopup()}
      <div className="col-7 d-none d-md-block h-100">
        <img
          img="Swimming"
          style={{height: '100vh', width: '100%', objectFit: 'cover', objectPosition: '50% 90%'}}
          src={process.env.PUBLIC_URL + '/images/swimmer1.jpg'}
        />
      </div>

      <div className="col h-100">
        <div className="text-center" style={{height: '150px'}}>
          {/* Swim Logo */}
          <Typography className="cursor" style={{height: '100%'}} onClick={() => {window.location.href = '/'}} className={classes.title}>
            <img className="cursor" src={process.env.PUBLIC_URL + '/images/logo-blue-2.png'} style={{height: '100%'}} alt="Swim Logo" />
          </Typography>
        </div>
        <Typography style={{marginTop: 10}} align="center" variant="h4" component="h1">Login</Typography>
        <div style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
          <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 5}}>
            <TextField
              style={{ flex: 1, margin: 5 }}
              id="email"
              label="Email"
              className={classes.textField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              margin="normal"
              variant="outlined"
            />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 5}}>
            <TextField
              style={{ flex: 1, margin: 5 }}
              id="password"
              label="Password"
              className={classes.textField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              margin="normal"
              variant="outlined"
            />
          </div>

            <Typography variant='body1' style={{marginLeft: 5, marginTop: 5}}>Don't have an account? <a className="link" onClick={handleSignUp}>Sign Up</a></Typography>

            <div className="text-center">
              {renderLoading()}
              <Button size="large" color="primary" onClick={handleSubmit} variant="contained" style={{ marginTop: 20, marginBottom: 20, minWidth: 90 }}>LOGIN</Button>
            </div>

        </div>
      </div>
    </div>
  )

  function handleSignUp() {
    console.log("props", props);

    if (redirect) {
      props.history.push('/signup?redirectUri=' + redirect);
    }
    else {
      props.history.push('/signup');
    }
  }

  async function handleSubmit() {
    console.log("Submitted");
    setLoading(true);
    if (!email || email === "") {
      setErrorMessage("Must enter a valid email");
      return;
    }

    if (!password || password === "") {
      setErrorMessage("Must enter a password");
      return;
    }


    try {
      let userResponse = await fetch("/auth/form/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          email: email,
          password: password,
        })
      })

      let response = await userResponse.json();
      console.log("response", response);
      setLoading(false);
      if (response.error) {
        setErrorMessage(response.error);
      }
      else {
        // successfully logged in
        
        console.log("successfully logged in");
        if (redirect) {
          window.location.href = redirect;
        }
        else {
          window.location.href = '/';
        }
      }
    }
    catch(err) {
      console.log("error", err);

      setErrorMessage(err);
    }



  }

  function renderLoading() {
    if (loading) {
      return (
        <Loading size={50} />
      )
    }
    else {
      return null;
    }

  }

  function setErrorMessage(message) {
    setPopupMessage(message);
    setPopupState(true);
    setLoading(false);
  }

  // Close the popup: error, success, info, warning
  function handlePopupClose(e, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setPopupState(false);
    setPopupMessage("");
  }
  
  // Render the popup snackbar of types: error, success, info, warning
  function renderPopup() {
    if (popupState) {
      return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={popupState}
          autoHideDuration={6000}
          onClose={handlePopupClose}
        >
          <Popup
            onClose={handlePopupClose}
            variant={'error'}
            message={popupMessage}
          />
        </Snackbar>
      )
    }
    else {
      return null;
    }
  }
}

Login.propTypes = {
  redirect: PropTypes.string,
}

export default Login;
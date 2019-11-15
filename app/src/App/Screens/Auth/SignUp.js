import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Snackbar } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Popup from '../../Components/Popup'
import PropTypes from 'prop-types';
import '../../stylesheets/Auth.css';
import Loading from '../../Components/Loading';
import queryString from 'query-string';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function SignUp(props) {
  const classes = useStyles(); // material-ui
  const [popupState, setPopupState] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [redirect, setRedirect] = useState('');

  const [loading, setLoading] = useState(false);

  // Form Inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Hide Navbar & Set all height requirements
  useEffect(() => {
    var navbar = document.getElementById('navbarTop');
    var htmlTag = document.getElementsByTagName('html')[0];
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
          alt="Road Biking"
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
        <Typography style={{marginTop: 10}} align="center" variant="h4" component="h1">Create Account</Typography>
        <div style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
          <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 10}}>
            <TextField
              style={{ flex: 1, margin: 5 }}
              id="firstName"
              label="First Name"
              className={classes.textField}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 5}}>
            <TextField
              style={{ flex: 1, margin: 5 }}
              id="lastName"
              label="Last Name"
              className={classes.textField}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 5}}>
            <TextField
              style={{ flex: 1, margin: 5 }}
              id="phoneNumber"
              label="Phone Number"
              className={classes.textField}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              margin="normal"
              variant="outlined"

            />

          </div>
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
          {/* <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 5}}>
            <TextField
              style={{ flex: 1, margin: 5 }}
              id="confirmPassword"
              label="Confirm Password"
              className={classes.textField}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              margin="normal"
              variant="outlined"
            />
          </div> */}
            <Typography variant='body1' style={{marginLeft: 5, marginTop: 5}}>Already have an account? <a className="link" onClick={handleLogIn}>Log In</a></Typography>

            <div className="text-center">
              {renderLoading()}
              <Button size="large" color="primary" onClick={handleSubmit} variant="contained" style={{ marginTop: 20, marginBottom: 20, minWidth: 90 }}>CREATE</Button>
            </div>

        </div>
      </div>
    </div>
  )

  function handleLogIn() {
    console.log("props", props);

    if (redirect) {
      props.history.push('/login?redirectUri=' + redirect);
    }
    else {
      props.history.push('/signup');
    }
  }

  async function handleSubmit() {
    console.log("Submitted");
    setLoading(true);

    if (!phoneNumber || phoneNumber === "") {
      setErrorMessage("Must enter your phone number");
      return;
    }

    if (!email || email === "") {
      setErrorMessage("Must enter a valid email");
      return;
    }

    if (!password || password === "") {
      setErrorMessage("Must enter a password");
      return;
    }


    // No error from the front end (May still receive an error from the server)

    // email, password, confirm_password, firstName, lastName, phoneNumber

    try {
      let userResponse = await fetch("/auth/newUser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          email: email,
          password: password,
          confirm_password: password,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          redirectUri: redirect
        })
      })

      let response = await userResponse.json();
      setLoading(false);
      if (response.error) {
        setErrorMessage(response.error);
      }
      else {
        // successfully created the account
        console.log("successfully created the accout");

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
    setLoading(false);
    setPopupMessage(message);
    setPopupState(true);
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


SignUp.propTypes = {
  redirect: PropTypes.string,
}

export default SignUp;
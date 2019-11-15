import React, { useState, useEffect } from 'react';
import {RotateSpinner} from 'react-spinners-kit';
import { useAsync } from 'react-async';

const AuthContext = React.createContext();

function AuthProvider(props) {
  // code for pre-loading the user's information if we have their token in localStorage goes here
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false)

  const {
    data = {user: { isAuth: false, user: {}, userAttributes: {} } },
    error,
    isRejected,
    isPending,
    isSettled,
    reload,
  } = useAsync({ promiseFn: getUser});

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true)
    }
  }, [isSettled])

  if (!firstAttemptFinished) {
    if (isPending) {
      return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <RotateSpinner color="#4182eb" />
        </div>
      )
    }
    if (isRejected) {
      return (
        <div css={{color: 'red'}}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      )
    }
  }


  const logout = () => {
    window.location.href = "/auth/logout";
  }

  const authenticate = (redirect) => {
    // Old way of authenticationg - IBM UI
    // window.location.href = "/auth/login?redirectUri=" + redirect;


    // New way of authenticating - CUSTOM UI
    window.location.href = "/login?redirectUri=" + redirect;

  }


  return (
    <AuthContext.Provider value={{data, logout, authenticate}} {...props} />
  )

}

const getUser = async () => {
  const res = await fetch('/auth/userData', {method: "GET"});
  if (!res.ok) {
    throw new Error(res)
  }
  // return res.json()

  let user = await res.json();
  if (user.error) {
    console.log("user error:", user.error);
    return { 
      user: {
        isAuth: false,
        user: {},
        userAttributes: {},
      }
    }
  }
  else {
    return {
      user: {
        isAuth: true,
        user: user.user,
        userAttributes: user.userAttributes
      }
    }
  }
}


// Function called within the app to reach logout function and authenticate
//
// import useAuth
// const {logout} = useAuth()
//
// calling logout
// onClick={logout}
//
// import useAuth
// const {authenticate} = useAuth()
//
// calling authenticate
// onClick={authenticate("/")}
//
function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`)
  }
  return context
}


export {AuthProvider, useAuth}
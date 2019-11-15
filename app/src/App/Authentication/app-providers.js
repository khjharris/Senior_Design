import React from 'react';


// For more information see github repo: https://github.com/kentcdodds/bookshelf
// For sandbox environment: https://codesandbox.io/s/github/kentcdodds/bookshelf


/**
 * Auth Provider
 * 
 * Responsible for bootstrapping the app data (simply retrieve the user's data)
 */
import {AuthProvider} from './auth-context';


// User Provider
/**
 * Responsible for storing the user's data
 */
import {UserProvider} from './user-context';

function AppProviders({children}) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  )
}


export default AppProviders;

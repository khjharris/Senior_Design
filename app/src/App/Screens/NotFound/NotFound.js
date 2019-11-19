import React, { useState, useEffect } from 'react';
import {Typography} from '@material-ui/core'
function NotFound(props) {

  return (
    <div>
      <Typography align="center" variant="h1">404</Typography>
      <Typography align="center" variant="h4">Page Not Found or Under Construction</Typography>
      <img alt="Not Found" style={{width: '100%' }} src={process.env.PUBLIC_URL + '/images/not-found.svg'}/>
    </div>
  )
}

export default NotFound;
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {Typography, Button, Divider} from '@material-ui/core';
import { Container } from 'react-bootstrap'

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({

}));

function Tab1(props) {
  const classes = useStyles(); // material-ui
  const {handleNext, date, facility} = props;

  return (
    <Container fluid style={{backgroundColor: '#F5F5F5', height: '100vh'}}>

      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', paddingTop: 40}}>
        <Typography variant="h3" component="h1" style={{fontSize: '1.8rem'}}>Select Your Date</Typography>
      </div>
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', paddingTop: 40}}>
        {renderCalendar()}
      </div>

      <div style={{marginTop: 30, display: 'flex', justifyContent: "center"}}>
        <Button size="large" color="primary" variant="contained" onClick={handleNext} style={{ marginTop: 30, marginLeft: 5 }}>Save & Continue</Button>
      </div>
    </Container>
  )

  function renderCalendar() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <DatePicker
          autoOk
          orientation="landscape"
          variant="static"
          openTo="date"
          value={date.value}
          onChange={date.onChange}
        />
    </MuiPickersUtilsProvider>
    )
  }
}

Tab1.propTypes = {
  prop1: PropTypes.any,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  facility: PropTypes.string.isRequired
}

export default Tab1;
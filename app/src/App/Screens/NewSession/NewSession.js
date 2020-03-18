import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { RotateSpinner } from 'react-spinners-kit';
import {Button, Typography, Slider} from '@material-ui/core'
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  // root: {
  //   width: 300,
  // },
  margin: {
    height: theme.spacing(3),
  },
}));

function NewSession(props) {
  const classes = useStyles(); // material-ui
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [duration, setDuration] = useState(10);
  const [error, setError] = useState(false);

  async function beginStream() {
    setLoading(true);
    console.log("Duration", duration);
    try {
      let stream = await fetch("/api/start", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          // 'Accept': 'application/json',
        },
        body: JSON.stringify({
          duration: duration,
        })
      })
      console.log("stream", stream);

      if (stream.ok) {
        setLoading(false);
        setComplete(true);
      }
      else {
        setLoading(false);
        setError(true)
      }
    }
    catch(e) {
      setError(true);
      setLoading(false);

    }

  }

  function valuetext(value) {
    setDuration(parseInt(value));
    console.log("new value", value);
  }

  function renderMain() {
    if (loading) {
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <RotateSpinner />
        </div>
      )
    }

    if (complete) {
      return <Typography gutterBottom>Session Recorded!</Typography>
    }

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: 300, marginBottom: 60}}>
        <Typography id="discrete-slider" gutterBottom>Duration</Typography>
        <Slider
          defaultValue={10}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={10}
          max={30}
        />
        <Button variant="outlined" onClick={beginStream}>START SESSION</Button>
        </div>
      </div>
    )
  }
  return (
    <div className={classes.root}>
      {renderMain()}
    </div>
  )
  
}

export default NewSession;
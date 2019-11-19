import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Stepper, Step, StepButton, Typography, Button, Snackbar, TextField, IconButton } from '@material-ui/core'
import { Row, Col } from 'react-bootstrap';

import Tab1 from './Tabs/Tab1';
import Tab2 from './Tabs/Tab2';
import Tab3 from './Tabs/Tab3';

import PropTypes from 'prop-types';
import '../../stylesheets/Checkout.css';

const useStyles = makeStyles(theme => ({

}));

function Facility(props) {
  const classes = useStyles(); // material-ui

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps(); // get steps

  const [facility, setFacility] = useState(props.match.params.value); // set facility
  // const [date, setDate] = useState(new Date());
  const date = useDateChange(new Date());
  console.log("facility", facility);

  return (
    <div>
      {renderFacility()}

      <div className="custom-container">
        <div style={{marginTop: 20}} />
        {/* Render Stepper */}
        {renderStepper()}

        <Row>
          {/* Render Step Content */}
          {renderStepContent()}
        </Row>

      </div>
    </div>
  )


  /**
   * Renders the stepper with the step titles
   */
  function renderStepper() {
    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={() => handleStep(index)} completed={completed[index]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
    )
  }

  /**
   * Render Step Content
   * 
   * Renders each individual tab
   */
  function renderStepContent() {
    return (
      <Col sm={12}>
        <div className="checkout-border">
          <div style={{marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10}}>
            {getStepContent()}
          </div>
        </div>
      </Col>
    )
  }

  function renderFacility() {
    switch(facility) {
      case "bu":
        return (
          <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/bu-facility.jpg'}
            style={{objectPosition: '50% 80%', objectFit: 'cover', height: 375}}
          />
        );

      case "bsc":
        return (
          <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/bsc-facility.jpg'}
            style={{objectPosition: '50% 30%', objectFit: 'cover', height: 375}}
          />
        )

      case "mit":
        return (
          <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/mit-facility.jpg'}
            style={{objectPosition: '50% 75%', objectFit: 'cover', height: 375}}
          />
        )
    }
  }

  /**
   * Renders the individual step depending on the active step
   */
  function getStepContent() {
    switch (activeStep) {
      case 0:
        return <Tab1 handleNext={handleNext} handleBack={handleBack} date={date} facility={facility} />;
      case 1:
        return <Tab2 handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <Tab3 handleNext={handleNext} handleBack={handleBack} handleComplete={handleComplete} />
      default:
        return;
    }
  }

  // Returns the total number of steps 
  function totalSteps() {
    return steps.length;
  }

  // Returns the number of all completed steps
  function completedSteps() {
    return Object.keys(completed).length;
  }

  // Determines if current step is the last step
  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  // Determines if all steps have been completed
  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStep(step) {
    setActiveStep(step)
  }

  function handleComplete() {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  }

  function handleReset() {
    setActiveStep(0);
    setCompleted({});
  }

  function useDateChange(initialValue) {
    const [value, setValue] = useState(initialValue);

    function onChange(date) {
      console.log('date change', date);
      setValue(date)
    }

    return {
      value: value,
      onChange: onChange
    }
  }
}

function getSteps() {
  return ['Date', 'Pick Your Lane', 'Access Video'];
}

Facility.propTypes = {
  prop1: PropTypes.any,
}

export default Facility;
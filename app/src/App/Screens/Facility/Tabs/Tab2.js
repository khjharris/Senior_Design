import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Typography, Button} from '@material-ui/core';
import { Container, Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  }
}));

function Tab2(props) {
  const classes = useStyles(); // material-ui
  const [value, setValue] = useState(null);
  const {handleNext} = props;

  return (
    <Container fluid style={{backgroundColor: '#F5F5F5', height: '100vh'}}>
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', paddingTop: 40, marginBottom: 40}}>
        <Typography variant="h3" component="h1" style={{fontSize: '1.8rem'}}>Select Your Lane</Typography>
      </div>
      <Row class="justify-content-md-center">
        <Col style={{textAlign: 'center', flex: 1}} xs={6} md={3}>
          <div>
            <div class="row justify-content-center">
              <Typography variant="h6">Lane 1</Typography>
            </div>
            <div class="row justify-content-center">
              {/* className="d-block w-100" */}
              <Button onClick={handleNext} classes={classes.button}>
                <img  src={process.env.PUBLIC_URL + '/images/lane.png'}
                  style={{width: 100}}
                />
              </Button>

            </div>
          </div>
        </Col>

        <Col style={{textAlign: 'center'}} xs={6} md={3}>
          <div>
            <div class="row justify-content-center">
              <Typography variant="h6">Lane 2</Typography>
            </div>
            <div class="row justify-content-center">
              <Button onClick={handleNext} classes={classes.button}>
                <img  src={process.env.PUBLIC_URL + '/images/lane.png'}
                  style={{width: 100}}
                />
              </Button>
            </div>
          </div>

        </Col>

        <Col style={{textAlign: 'center'}} xs={6} md={3}>
          <div>
            <div class="row justify-content-center">
              <Typography variant="h6">Lane 3</Typography>
            </div>
            <div class="row justify-content-center">
              <Button onClick={handleNext} classes={classes.button}>
                <img  src={process.env.PUBLIC_URL + '/images/lane.png'}
                  style={{width: 100}}
                />
              </Button>
            </div>
          </div>

        </Col>

        <Col style={{textAlign: 'center'}} xs={6} md={3}>
          <div>
            <div class="row justify-content-center">
              <Typography variant="h6">Lane 4</Typography>
            </div>
            <div class="row justify-content-center">
              <Button onClick={handleNext} classes={classes.button}>
                <img  src={process.env.PUBLIC_URL + '/images/lane.png'}
                  style={{width: 100}}
                />
              </Button>
            </div>
          </div>
        </Col>

      </Row>
    </Container>
  )
}

Tab2.propTypes = {
  prop1: PropTypes.any,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
}

export default Tab2;
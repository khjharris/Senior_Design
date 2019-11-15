import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {PlayCircleOutline} from '@material-ui/icons'
import {Typography, Button} from '@material-ui/core';
import { Container, Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types';

import '../../../stylesheets/facility.css';

const useStyles = makeStyles(theme => ({

}));

function Tab3(props) {
  const classes = useStyles(); // material-ui
  const [value, setValue] = useState(null)
  const {handleComplete} = props;
  return (
    <Container fluid style={{backgroundColor: '#F5F5F5', height: '100vh'}}>
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', paddingTop: 40, marginBottom: 60}}>
        <Typography variant="h3" component="h1" style={{fontSize: '1.8rem'}}>Select Your Video</Typography>
      </div>

      <div className="row justify-content-center" style={{padding: 10}}>
        <Col className="colMargin" xs={6} md={3}>
          <div className="square" style={{border: '1px solid black', padding: 15, backgroundColor: 'black'}}>
            <PlayCircleOutline style={{color: 'white', alignSelf: 'center'}}/>
          </div>
        </Col>

        <Col className="colMargin" xs={6} md={3}>
          <div className="square" style={{border: '1px solid black', padding: 15, backgroundColor: 'black'}}>
            <PlayCircleOutline style={{color: 'white', alignSelf: 'center'}}/>

          </div>
        </Col>

        <Col className="colMargin" xs={6} md={3}>
          <div className="square" style={{border: '1px solid black', padding: 15, backgroundColor: 'black'}}>
            <PlayCircleOutline style={{color: 'white', alignSelf: 'center'}}/>

          </div>
        </Col>

        <Col className="colMargin" xs={6} md={3}>
          <div className="square" style={{border: '1px solid black', padding: 15, backgroundColor: 'black'}}>
            <PlayCircleOutline style={{color: 'white', alignSelf: 'center'}}/>
          </div>
        </Col>
      </div>

      <div style={{marginTop: 30, display: 'flex', justifyContent: "center"}}>
        <Button disabled={true} size="large" color="primary" variant="contained" onClick={handleComplete} style={{ marginTop: 30, marginLeft: 5 }}>Add To Profile</Button>
      </div>
    </Container>
  )
}

Tab3.propTypes = {
  prop1: PropTypes.any,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired
}

export default Tab3;
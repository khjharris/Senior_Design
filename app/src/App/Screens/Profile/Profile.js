import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useUser} from '../../Authentication/user-context';

import {MenuItem, TextField} from '@material-ui/core';
import {Col, Card} from 'react-bootstrap';
import EditProfileModal from './EditProfileModal';

import '../../stylesheets/Profile.css';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    display: 'none !important;', // we don't want the select modal to popup in the profile
  },
}));

function Profile(props) {
  const classes = useStyles(); // material-ui
  const userObj = useUser().user;

  const [modalState, setModalState] = useState(false);
  const [modalDetails, setModalDetails] = useState({ isReady: false, handleChange: null, propValue: '', name: '', label: '', textFieldType: '', type: '', selectorOptions: null, helperText: ''});
  
  const nameArr = userObj.user.name.split(/ (.*)/);

  const [personalInformation, setPersonalInformation] = useState({
    firstName: nameArr[0],
    lastName: nameArr[1],
    phoneNumber: userObj.userAttributes.phoneNumber ? userObj.userAttributes.phoneNumber : ''
  })

  const [profileValues, setProfileValues] = useState({
    height: userObj.userAttributes.height ? userObj.userAttributes.height : '',
    weight: userObj.userAttributes.weight? userObj.userAttributes.weight : '',
  });

  function handlePersonalInformationChange(name, value) {
    setPersonalInformation({ ...personalInformation, [name]: value })
  }

  function handleProfileChange(name, value) {
    setProfileValues({ ...profileValues, [name]: value })
  }


  return (
    <div className="custom-container" style={{marginTop: 10, marginBottom: 40}}>
      {/* Render Modal */}
      {renderModalEdit()}

      {/* Render the personal information from a user's profile */}
      {renderPersonalInformation()}
      <hr />

      {/* Render the iser profile for bike customization */}
      {renderRiderProfile()}
    </div>
  )

  function handleCloseModal() {
    setModalState(false);
    var bodyTag = document.getElementsByTagName('body')[0];
    bodyTag.style.removeProperty('overflow'); // remove overflow hidden
    setModalDetails({ isReady: false, handleChange: null, propValue: '', name: '', label: '', textFieldType: '', type: '', selectorOptions: null, helperText: '' })
  }

  function renderModalEdit() {

    if (modalState && modalDetails.isReady) {
      return <EditProfileModal handleClose={handleCloseModal} handleChange={modalDetails.handleChange} propValue={modalDetails.propValue} name={modalDetails.name} label={modalDetails.label} textFieldType={modalDetails.textFieldType} type={modalDetails.type} selectorOptions={modalDetails.selectorOptions} helperText={modalDetails.helperText} />
    }
    return null;
  }

  function onClickTextField(name, label, value, handleChange, htmlInputType) {
    setModalDetails({ isReady: true, handleChange: handleChange, propValue: value, name: name, label: label, textFieldType: 'textfield', type: htmlInputType, selectorOptions: null, helperText: ''})
    setModalState(true);
  }

  function onClickSelector(name, label, value, handleChange, helperText, selectorOptions) {
    setModalDetails( {isReady: true, handleChange: handleChange, propValue: value, name: name, label: label, textFieldType: 'select', type: '', selectorOptions: selectorOptions, helperText: helperText} )
    setModalState(true)
  }

  function renderPersonalInformation() {
    return (
      <div>
        <Col>
          <Card>
            <Card.Header>Personal Information</Card.Header>
            <Card.Body>
              {/* <Card.Title>Special title</Card.Title>
              <Card.Text>Supporting text</Card.Text> */}
              <div style={{flexDirection: 'row', display: 'flex', flex: 1}}>
                <TextField
                  disabled
                  style={{ flex: 0.5, margin: 5 }}
                  id="outlined-firstname"
                  label="First Name"
                  className={classes.textField}
                  value={personalInformation.firstName}
                  // onChange={handlePersonalInformationChange('firstName')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  disabled
                  style={{ flex: 0.5, margin: 5 }}
                  id="outlined-lastname"
                  label="Last Name"
                  className={classes.textField}
                  value={personalInformation.lastName}
                  // onChange={handlePersonalInformationChange('lastName')}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div style={{flexDirection: 'row', display: 'flex', flex: 1, marginTop: 10}}>
                <TextField
                  disabled
                  style={{ flex: 0.5, margin: 5 }}
                  id="outlined-email"
                  label="Email"
                  className={classes.textField}
                  value={userObj.user.email}
                  margin="normal"
                  variant="outlined"
                  type="email"
                />
                <TextField
                  style={{ flex: 0.5, margin: 5 }}
                  id="outlined-name"
                  label="Phone Number"
                  className={classes.textField}
                  value={personalInformation.phoneNumber}
                  onClick={() => onClickTextField("phoneNumber", "Phone Number", personalInformation.phoneNumber, handlePersonalInformationChange, 'tel')}
                  // onChange={handlePersonalInformationChange('phoneNumber')}
                  margin="normal"
                  variant="outlined"
                  type="tel"
                />
              </div>

            </Card.Body>
          </Card>
        </Col>
      </div>
    )
  }

  function renderRiderProfile() {
    return (
      <div>
        <Col>
          <Card>
            <Card.Header>Swimmer Profile</Card.Header>
            <Card.Body>
            <div style={{ flexDirection: 'row', display: 'flex', flex: 1, marginBottom: 15 }}>
              <TextField
                fullWidth
                style={{ flex: 0.5, margin: 5 }}
                id="outlined-name"
                label="Height (cm)"
                className={classes.textField}
                value={profileValues.height}
                // onChange={handleProfileChange('riderHeight')}
                onClick={() => {onClickTextField("height", "Height (cm)", profileValues.height, handleProfileChange, 'number')}}
                type="number"
                margin="normal"
                variant="outlined"
              />

              <TextField
                fullWidth
                style={{ flex: 0.5, margin: 5 }}
                id="outlined-name"
                label="Weight (kg)"
                className={classes.textField}
                value={profileValues.weight}
                onClick={() => {onClickTextField("weight", "Weight (kg)", profileValues.weight, handleProfileChange, 'number')}}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </div>

            {/* <div style={{ flexDirection: 'row', display: 'flex', flex: 1, marginTop: 5 }}>
              <TextField
                fullWidth
                style={{ flex: 0.5, margin: 1 }}
                id="outlined-name"
                label="Weight (kg)"
                className={classes.textField}
                value={profileValues.weight}
                onClick={() => {onClickTextField("weight", "Weight (kg)", profileValues.weight, handleProfileChange, 'number')}}
                type="number"
                margin="normal"
                variant="outlined"
              />
            </div> */}
            </Card.Body>
          </Card>
        </Col>
      </div>
    )
  }
}


export default Profile;
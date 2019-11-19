import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Modal, Button, MenuItem, TextField, Snackbar, Checkbox, FormLabel, FormControlLabel } from '@material-ui/core'
import Loading from '../../Components/Loading'
import PropTypes from 'prop-types';

import '../../stylesheets/App.css';

const useStyles = makeStyles(theme => ({
  menu: {
    width: 200,
  },
}));

function EditProfileModal(props) {
  const classes = useStyles(); // material-ui
  
  // const { handleClose, handleChange, name, children } = props;
  const { handleClose, handleChange, propValue, name, label, type, textFieldType, selectorOptions, helperText} = props;

  const [newValue, setNewValue] = useState(propValue);
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    setNewValue(e.target.value);
  }

  async function handleSave() {
    setLoading(true);

    let data = {
      name: name,
      value: newValue
    }
    let res = await fetch('/auth/userData', {method: 'POST', body: JSON.stringify(data), headers: {"Content-Type": "application/json"}})
    let resJson = await res.json();
    console.log("saved new data", resJson);

    setLoading(false);
    handleChange(name, newValue); // change the value in the profile
    handleClose(); // close the modal
    window.location.reload();
  }

  if (textFieldType === "textfield") {
    return (
      <div>
        <Modal open={true} onClose={handleClose}>
          <div className="modal-css">
            {/* {children} */}
            <div style={{flex: 1}}>

            <Typography align="center" style={{marginTop: 10, flex: 1}} variant="h5">Edit {label}</Typography>
            <TextField
              fullWidth
              style={{ marginTop: 20, flex: 1 }}
              label={label}
              value={newValue}
              onChange={onChange}
              margin="normal"
              variant="outlined"
              type={type}
            />
            </div>

            {renderButtonOrLoading()}
          </div>
        </Modal>
      </div>
  
    )
  }
  else {
    return (
      <div>
        <Modal open={true} onClose={handleClose}>
          <div className="modal-css">
          <div style={{flex: 1}}>

            <Typography align="center" style={{marginTop: 10, flex: 1}} variant="h5">Edit {label}</Typography>
            <TextField
              fullWidth
              select
              style={{ flex: 0.8, margin: 10 }}
              label={label}
              className={classes.textField}
              value={newValue}
              onChange={onChange}
              margin="normal"
              variant="outlined"
              helperText={helperText}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
            >
              {
                  selectorOptions ?
                  selectorOptions.map((obj, index) => (
                    <MenuItem key={obj.key} value={obj.value}>{obj.label}</MenuItem>
                  ))
                  : null
              }

            </TextField>
            </div>

            {renderButtonOrLoading()}

          </div>
        </Modal>
      </div>
    )
  }

  function renderButtonOrLoading() {
    if (loading) {
      return (
        <Loading size={50} />
      )
    }
    else {
      return (
        <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
          <Button size="large" variant="outlined" onClick={handleClose} style={{color: 'black', marginTop: 20, marginRight: 0.5, flex: 0.5}}>Cancel</Button>
          <Button size="large" variant="contained" onClick={handleSave} style={{color: 'white', backgroundColor: "#45b97c", marginTop: 20, marginLeft: 5, flex: 0.5}}>Save</Button>
        </div>
      )
    }
    return null;
  }

}

EditProfileModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  propValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  textFieldType: PropTypes.oneOf(["textfield", "select"]).isRequired,
  selectorOptions: PropTypes.any,
  type: PropTypes.string,
  helperText: PropTypes.string
  // children: PropTypes.any.isRequired
}

export default EditProfileModal;
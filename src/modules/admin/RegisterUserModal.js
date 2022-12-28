import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AES } from 'crypto-js';
import { ADD_USER } from './adminSlice';
import { useRegisterUserMutation } from '../../services/admin';
import config from '../../config/server';

const baseConfig = config[config.serviceServerName['auth']];

export default function RegisterUserModal(props) {
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();

  const { show, onHide } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState({});
  const [permanentAddress, setPermanentAddress] = useState('');
  const [permanentCity, setPermanentCity] = useState('');
  const [permanentState, setPermanentState] = useState('');
  const [permanentPincode, setPermanentPincode] = useState('');
  
  const handleChange = (event, field) => {
    switch (field) {
      case 'first_name':
        setData({ ...data, first_name: event.target.value});
        break;
      case 'middle_name':
        setData({ ...data, middle_name: event.target.value});
        break;
      case 'last_name':
        setData({ ...data, last_name: event.target.value});
        break;
      case 'email':
        setData({ ...data, email: event.target.value});
        break;
      case 'password':
        setData({ ...data, password: event.target.value});
        break;
      case 'mobile_number':
        setData({ ...data, mobile: event.target.value});
        break;
      case 'dob':
        setData({ ...data, dob: event.target.value});
        break;
      case 'gender':
        setData({ ...data, gender: event.target.value});
        break;
      case 'aadhaar':
        setData({ ...data, aadhaar: event.target.value});
        break;
      case 'current_address':
        setData({ ...data, current_address: event.target.value});
        break;
      case 'current_city':
        setData({ ...data, current_city: event.target.value});
        break;
      case 'current_state':
        setData({ ...data, current_state: event.target.value});
        break;
      case 'current_pincode':
        setData({ ...data, current_pincode: event.target.value});
        break;
      default:
        console.log('nothing');
      }
  };
  
  const handleSubmit = async () => {
    data.permanent_address = permanentAddress;
    data.permanent_city = permanentCity;
    data.permanent_state = permanentState;
    data.permanent_pincode = permanentPincode;
    const encryptedPassword = AES.encrypt(data.password, baseConfig.encryptionKey).toString();
    data.password = encryptedPassword;
    dispatch(ADD_USER({ data }));
    const response = await registerUser(data);
    onHide();
  };

  const handleCheckBoxClicked = (event) => {
    if (event.target.checked) {
      setPermanentAddress(data?.current_address);
      setPermanentCity(data?.current_city);
      setPermanentState(data?.current_state);
      setPermanentPincode(data?.current_pincode);
    }
    setIsChecked(current => !current);
  };

  return (
    <div>
      <Dialog 
        open={show} 
        onClose={onHide}         
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle className="registerModalTitle">Register New User</DialogTitle>
        <DialogContent>
          <DialogContentText className="registerModalContentText">
            Personal Information
          </DialogContentText>
          <Divider />
          <div className='registerModalBody'>
            <div className="registerModalBodyField">
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'first_name')}
              />
              <TextField
                margin="dense"
                id="name"
                label="Middle Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'middle_name')}
              />
              <TextField
                margin="dense"
                id="name"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'last_name')}
              />
            </div>
            <div className="registerModalBodyField">
              <TextField
                required
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'email')}
              />
              <TextField
                required
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'password')}
              />
            </div>
            <div className="registerModalBodyField" style={{ marginTop: '15px' }}>
              <TextField
                required
                margin="dense"
                id="name"
                label="Mobile Number"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'mobile_number')}
              />
              <TextField
                id="date"
                label="Date Of Birth"
                type="date"
                defaultValue="1997-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => handleChange(e, 'dob')}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                onChange={(e) => handleChange(e, 'gender')}
                label="Gender"
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </Select>
              </FormControl>
            </div>
            <TextField
              required
              margin="dense"
              id="name"
              label="Aadhaar Number"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e, 'aadhaar')}
            />
          </div>
          <DialogContentText className="registerModalContentText" style={{ marginTop: '20px' }}>
            Address Information
          </DialogContentText>
          <Divider />
          <div className='registerModalBody'>
            <TextField
              id="standard-textarea"
              label="Current Address"
              placeholder="Placeholder"
              multiline
              variant="standard"
              fullWidth
              onChange={(e) => handleChange(e, 'current_address')}
            />
            <div className="registerModalBodyField">
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="Current City"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'current_city')}
              />
              <TextField
                required
                margin="dense"
                id="name"
                label="Current State"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'current_state')}
              />
              <TextField
                required
                margin="dense"
                id="name"
                label="Current Pincode"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'current_pincode')}
              />
            </div>
            <FormControlLabel 
              control={<Checkbox value={isChecked} onChange={(e) => handleCheckBoxClicked(e)}/>} 
              label="Permanent address same as Current address" 
            />
            <TextField
              id="standard-textarea"
              label="Permanent Address"
              placeholder="Placeholder"
              multiline
              variant="standard"
              fullWidth
              defaultValue={permanentAddress}
              onChange={(e) => handleChange(e, 'permanent_address')}
            />
            <div className="registerModalBodyField">
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="Permanent City"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={permanentCity}
                onChange={(e) => handleChange(e, 'permanent_city')}
              />
              <TextField
                required
                margin="dense"
                id="name"
                label="Permanent State"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={permanentState}
                onChange={(e) => handleChange(e, 'permanent_state')}
              />
              <TextField
                required
                margin="dense"
                id="name"
                label="Permanent Pincode"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={permanentPincode}
                onChange={(e) => handleChange(e, 'permanent_pincode')}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="registerModalBtn" onClick={onHide}>Cancel</Button>
          <Button className="registerModalBtn" onClick={() => handleSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
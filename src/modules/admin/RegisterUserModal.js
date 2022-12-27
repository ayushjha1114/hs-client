import * as React from 'react';
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

export default function RegisterUserModal(props) {
  const { show, onHide } = props;

  const handleChange = (event, field) => {

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
                onChange={(e) => handleChange(e, 'first_Name')}
              />
              <TextField
                margin="dense"
                id="name"
                label="Middle Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'middle_Name')}
              />
              <TextField
                margin="dense"
                id="name"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'last_Name')}
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
              <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={age}
                onChange={(e) => handleChange(e, 'age')}
                label="Age"
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
            <FormControlLabel control={<Checkbox />} label="Permanent address same as Current address" />
            <TextField
              id="standard-textarea"
              label="Permanent Address"
              placeholder="Placeholder"
              multiline
              variant="standard"
              fullWidth
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
                onChange={(e) => handleChange(e, 'permanent_pincode')}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="registerModalBtn" onClick={onHide}>Cancel</Button>
          <Button className="registerModalBtn" onClick={onHide}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
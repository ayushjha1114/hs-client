import React, { useEffect, useState } from 'react';
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
import { useGetAllUserQuery, useRegisterUserMutation, useUpdateUserDetailMutation } from '../../services/admin';
import config from '../../config/server';
import { notification } from 'antd';

const baseConfig = config[config.serviceServerName['auth']];

export default function RegisterUserModal(props) {
  const { show, onHide, forEdit, forView, mobile, closeEdit, closeView  } = props;

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.admin.userList);

  const [registerUser] = useRegisterUserMutation();
  const [updateUserDetail] = useUpdateUserDetailMutation();
  const { refetch } = useGetAllUserQuery();

  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState({});
  const [permanentAddress, setPermanentAddress] = useState('');
  const [permanentCity, setPermanentCity] = useState('');
  const [permanentState, setPermanentState] = useState('');
  const [permanentPincode, setPermanentPincode] = useState('');
  const [defaultData, setDefaultData] = useState({});

  let errorHandler = (message, description) => {
    setTimeout(() => {
      notification.error({
        message,
        description,
        duration: 8,
        className: "notification-error"
      });
    }, 50)
  }
  
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
        setData({ ...data, date_of_birth: event.target.value});
        break;
      case 'gender':
        setData({ ...data, gender: event.target.value});
        break;
      case 'aadhaar':
        setData({ ...data, aadhaar_number: event.target.value});
        break;
      case 'role':
        setData({ ...data, role: event.target.value});
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
  
  const handleCheckBoxClicked = (event) => {
    if (event.target.checked) {
      setPermanentAddress(data?.current_address);
      setPermanentCity(data?.current_city);
      setPermanentState(data?.current_state);
      setPermanentPincode(data?.current_pincode);
    }
    setIsChecked(current => !current);
  };
  
  const handleSubmit = async () => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (forEdit) {
        let modifiedData = data;
        modifiedData.mobile = mobile;
        const response = await updateUserDetail(modifiedData);
        if (response?.data?.success) {
          notification.success({
            message: 'Success',
            description: 'Update Successfully !!',
            duration: 4,
            className: 'notification-green',
          });
        } else {
          errorHandler(
            'Technical Error',
            'There may be some error occurred while processing the request. Please try after some time.'
          )
        }
      } else {
        if (!data.first_name) {
          errorHandler(
            'Error occurred',
            'Please enter your first name.'
          )
        } else if (!data.email) {
          errorHandler(
            'Error occurred',
            'Please enter the email.'
          )
        } else if (!reg.test(data.email)) {
          errorHandler(
            'Error occurred',
            'Please enter the valid email.'
          )
          
        } else if (!data.password) {
          errorHandler(
            'Error occurred',
            'Please enter the password.'
          )
        } else if (data.password.length < 6) {
          errorHandler(
            'Error occurred',
            'Please enter valid password of minimum 6 characters in length.'
          )
        } else if (!data.mobile) {
          errorHandler(
            'Error occurred',
            'Please enter the mobile.'
          )
        } else if (data.mobile.length !== 10) {
          errorHandler(
            'Error occurred',
            'Please enter valid mobile number.'
          )
        } else {
        data.permanent_address = permanentAddress;
        data.permanent_city = permanentCity;
        data.permanent_state = permanentState;
        data.permanent_pincode = permanentPincode;
        const encryptedPassword = AES.encrypt(data.password, baseConfig.encryptionKey).toString();
        data.password = encryptedPassword;
        const response = await registerUser(data);
        if (response?.data?.success) {
          dispatch(ADD_USER({ data }));
          notification.success({
            message: 'Success',
            description: 'User Registration Successfully !!',
            duration: 4,
            className: 'notification-green',
          });
        } else {
          errorHandler(
            'Technical Error',
            'There may be some error occurred while processing the request. Please try after some time.'
          )
        }
      }
      }
      refetch();
      onHide();
  };

  useEffect(() => {
    if (userList.length > 0) {
      userList.map(item => {
        if(item.mobile === mobile) {
          setDefaultData(item);
        }
      });
    }
  }, [forEdit, forView, show]);

  const handleCancel = () => {
    onHide();
    if(forEdit) {
      closeEdit();
    } else if (forView) {
      closeView();
    }
  };

  return (
    <div>
      <Dialog 
        open={show} 
        onClose={onHide}         
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle className="registerModalTitle">{forEdit ? 'Edit User': forView ? 'View User': 'Register New User' }</DialogTitle>
        <DialogContent>
          <DialogContentText className="registerModalContentText">
            Personal Information
          </DialogContentText>
          <Divider />
          <div className='registerModalBody'>
            <div className="registerModalBodyField">
              <TextField
                required
                disabled={forView}
                autoFocus
                margin="dense"
                id="name"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={(forEdit || forView) ? defaultData?.first_name : ''}
                onChange={(e) => handleChange(e, 'first_name')}
              />
              <TextField
                margin="dense"
                disabled={forView}
                id="name"
                label="Middle Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={(forEdit || forView) ? ((defaultData?.middle_name === 'null') ? '': defaultData?.middle_name) : ''}
                onChange={(e) => handleChange(e, 'middle_name')}
              />
              <TextField
                margin="dense"
                disabled={forView}
                id="name"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={(forEdit || forView) ? ((defaultData?.last_name === 'null') ? '': defaultData?.last_name): ''}
                onChange={(e) => handleChange(e, 'last_name')}
              />
            </div>
            <div className="registerModalBodyField">
              <TextField
                disabled={forEdit || forView}
                required
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                defaultValue={(forEdit || forView) ? defaultData?.email : ''}
                onChange={(e) => handleChange(e, 'email')}
              />
              <TextField
                required
                disabled={forEdit || forView}
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
                disabled={forEdit || forView}
                margin="dense"
                id="name"
                label="Mobile Number"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={(forEdit || forView) ? defaultData?.mobile : ''}
                onChange={(e) => handleChange(e, 'mobile_number')}
              />
              <TextField
                id="date"
                disabled={forView}
                label="Date Of Birth"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleChange(e, 'dob')}
                defaultValue={(forEdit || forView) ? ((defaultData?.date_of_birth === 'null') ? '1997-05-24': defaultData?.date_of_birth) : '1997-05-24'}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                onChange={(e) => handleChange(e, 'gender')}
                label="Gender"
                defaultValue={(forEdit || forView) ? defaultData?.gender : ''}
                disabled={forView}
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </Select>
              </FormControl>
            </div>
            <div className="registerModalBodyField" style={{ marginTop: '15px' }}>
              <TextField
                disabled={forView}
                margin="dense"
                id="name"
                label="Aadhaar Number"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'aadhaar')}
                defaultValue={(forEdit || forView) ? defaultData?.aadhaar_number : ''}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">User Type</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, 'role')}
                  label="User Type"
                  defaultValue={(forEdit || forView) ? defaultData?.type : ''}
                  disabled={forView}
                >
                  <MenuItem value='ADMIN'>ADMIN</MenuItem>
                  <MenuItem value='USER'>USER</MenuItem>
                  <MenuItem value='AMC'>AMC</MenuItem>
                  <MenuItem value='ENGINEER'>ENGINEER</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <DialogContentText className="registerModalContentText" style={{ marginTop: '20px' }}>
            Address Information
          </DialogContentText>
          <Divider />
          <div className='registerModalBody'>
            <TextField
              disabled={forView}
              id="standard-textarea"
              label="Current Address"
              placeholder="Placeholder"
              multiline
              variant="standard"
              fullWidth
              onChange={(e) => handleChange(e, 'current_address')}
              defaultValue={(forEdit || forView) ? defaultData?.current_address : ''}
            />
            <div className="registerModalBodyField">
              <TextField
                disabled={forView}
                margin="dense"
                id="name"
                label="Current City"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'current_city')}
                defaultValue={(forEdit || forView) ? defaultData?.current_city : ''}
              />
              <TextField
                disabled={forView}
                margin="dense"
                id="name"
                label="Current State"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'current_state')}
                defaultValue={(forEdit || forView) ? defaultData?.current_state : ''}
              />
              <TextField
                disabled={forView}
                margin="dense"
                id="name"
                label="Current Pincode"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'current_pincode')}
                defaultValue={(forEdit || forView) ? defaultData?.current_pincode : ''}
              />
            </div>
            <FormControlLabel 
              control={<Checkbox value={isChecked} onChange={(e) => handleCheckBoxClicked(e)}/>} 
              label="Permanent address same as Current address" 
            />
            <TextField
              disabled={forView}
              id="standard-textarea"
              label="Permanent Address"
              placeholder="Placeholder"
              multiline
              variant="standard"
              fullWidth
              onChange={(e) => handleChange(e, 'permanent_address')}
              defaultValue={(forEdit || forView) ? defaultData?.permanent_address : permanentAddress}
            />
            <div className="registerModalBodyField">
              <TextField
                disabled={forView}
                margin="dense"
                id="name"
                label="Permanent City"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'permanent_city')}
                defaultValue={(forEdit || forView) ? defaultData?.permanent_city : permanentCity}
              />
              <TextField
                disabled={forView}
                margin="dense"
                id="name"
                label="Permanent State"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'permanent_state')}
                defaultValue={(forEdit || forView) ? defaultData?.permanent_state : permanentState}
              />
              <TextField
                disabled={forView}
                margin="dense"
                id="name"
                label="Permanent Pincode"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, 'permanent_pincode')}
                defaultValue={(forEdit || forView) ? defaultData?.permanent_pincode : permanentPincode}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="registerModalBtn" onClick={() => handleCancel()}>Cancel</Button>
          {
            !forView && 
            <Button className="registerModalBtn" onClick={() => handleSubmit()}>{forEdit ? 'Edit': 'Submit'}</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
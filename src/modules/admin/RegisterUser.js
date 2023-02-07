import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { AES } from 'crypto-js';
import {
  useGetAllUserQuery,
  useRegisterUserMutation,
  useUpdateUserDetailMutation,
  useGetUserByIdQuery,
} from '../../services/admin';
import config from '../../config/server';
import { notification } from 'antd';
import UserLayout from '../../layout/User';
import moment from 'moment';
import { devices } from '../../config/constant';
import { Card,InputLabel,Select,
  MenuItem, IconButton,OutlinedInput,CardHeader,
   InputAdornment,Button ,Radio,RadioGroup,FormControlLabel,
   FormControl,FormLabel,FormGroup,Checkbox,CardActions,CardContent,Paper} from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailIcon from '@mui/icons-material/Mail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useForm ,Controller} from 'react-hook-form';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const baseConfig = config[config.serviceServerName['auth']];

const RegisterUser = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const defaultUserData = useSelector((state) => state.admin.defaultUserData);

  const [registerUser] = useRegisterUserMutation();
  const [updateUserDetail] = useUpdateUserDetailMutation();
  const { refetch } = useGetAllUserQuery({ limit: 10, offset: 0 });
  

  const [isChecked, setIsChecked] = useState(false);
  // const [data, setData] = useState({});
  const [permanentAddress, setPermanentAddress] = useState('');
  const [isCurrentSame, setIsCurrentSame] = useState(false);
  const [permanentState, setPermanentState] = useState('');
  const [prefillValue, setPrefillValue] = useState({});
  const [userTypeAMC, setUserTypeAMC] = useState(false);
  const [forEdit, setForEdit] = useState(location?.state?.forEdit);
  const [device, setDevice] = React.useState([]);
  const [mobile, setMobile] = useState(location?.state?.mobile);
  const [id, setId] = useState(location?.state?.id);
  const [AMCData, setAMCData] = useState({});
  const currentDate = moment().format('YYYY-MM-DD');
 

  let errorHandler = (message, description) => {
    setTimeout(() => {
      notification.error({
        message,
        description,
        duration: 8,
        className: 'notification-error',
      });
    }, 50);
  };

  // const handleChange = (event, field) => {
  //   switch (field) {
  //     case 'first_name':
  //       setData({ ...data, first_name: event.target.value });
  //       break;
  //     case 'middle_name':
  //       setData({ ...data, middle_name: event.target.value });
  //       break;
  //     case 'last_name':
  //       setData({ ...data, last_name: event.target.value });
  //       break;
  //     case 'email':
  //       setData({ ...data, email: event.target.value });
  //       break;
  //     case 'password':
  //       setData({ ...data, password: event.target.value });
  //       break;
  //     case 'mobile_number':
  //       setData({ ...data, mobile: event.target.value });
  //       break;
  //     case 'dob':
  //       setData({ ...data, date_of_birth: event.target.value });
  //       break;
  //     case 'gender':
  //       setData({ ...data, gender: event.target.value });
  //       break;
  //     case 'aadhaar':
  //       setData({ ...data, aadhaar_number: event.target.value });
  //       break;
  //     case 'role':
  //       setData({ ...data, role: event.target.value });
  //       if (event.target.value === 'AMC') {
  //         setUserTypeAMC(true);
  //       } else {
  //         setUserTypeAMC(false);
  //       }
  //       break;
  //     case 'current_address':
  //       setData({ ...data, current_address: event.target.value });
  //       break;
  //     case 'current_city':
  //       setData({ ...data, current_city: event.target.value });
  //       break;
  //     case 'current_state':
  //       setData({ ...data, current_state: event.target.value });
  //       break;
  //     case 'current_pincode':
  //       setData({ ...data, current_pincode: event.target.value });
  //       break;
  //     case 'permanent_address':
  //       setPermanentAddress(event.target.value);
  //       break;
  //     case 'permanent_city':
  //       setPermanentCity(event.target.value);
  //       break;
  //     case 'permanent_state':
  //       setPermanentState(event.target.value);
  //       break;
  //     case 'permanent_pincode':
  //       setPermanentPincode(event.target.value);
  //       break;
  //     case 'company_name':
  //       setAMCData({ ...AMCData, company_name: event.target.value });
  //       break;
  //     case 'date_of_registration':
  //       setAMCData({ ...AMCData, date_of_registration: event.target.value });
  //       break;
  //     case 'plan_activation_date':
  //       setAMCData({ ...AMCData, plan_activation_date: event.target.value });
  //       break;
  //     case 'user_plan':
  //       setAMCData({ ...AMCData, user_plan: event.target.value });
  //       break;
  //     case 'plan_expired_date':
  //       setAMCData({ ...AMCData, plan_expired_date: event.target.value });
  //       break;
  //     case 'gst_number':
  //       setAMCData({ ...AMCData, gst_number: event.target.value });
  //       break;
  //     case 'pan_number':
  //       setAMCData({ ...AMCData, pan_number: event.target.value });
  //       break;
  //     case 'device':
  //       const {
  //         target: { value },
  //       } = event;
  //       setDevice(typeof value === 'string' ? value.split(',') : value);
  //       break;
  //     case 'director_email':
  //       setAMCData({ ...AMCData, director_email: event.target.value });
  //       break;
  //     case 'admin_email':
  //       setAMCData({ ...AMCData, admin_email: event.target.value });
  //       break;
  //     default:
  //       console.log('nothing');
  //   }
  // };

  // const handleCheckBoxClicked = (event) => {
  //   if (event.target.checked) {
  //     setPermanentAddress(data?.current_address);
  //     setPermanentCity(data?.current_city);
  //     setPermanentState(data?.current_state);
  //     setPermanentPincode(data?.current_pincode);
  //   } else {
  //     setPermanentAddress('');
  //     setPermanentCity('');
  //     setPermanentState('');
  //     setPermanentPincode('');
  //   }
  //   setIsChecked((current) => !current);
  // };

  // const handleSubmit1 = async () => {
  //   let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  //   if (forEdit) {
  //     let modifiedData = data;
  //     modifiedData.mobile = mobile;
  //     const response = await updateUserDetail(modifiedData);
  //     if (response?.data?.success) {
  //       notification.success({
  //         message: 'Success',
  //         description: 'Update Successfully !!',
  //         duration: 4,
  //         className: 'notification-green',
  //       });
  //       refetch();
  //       navigate('/admin/user-management');
  //     } else {
  //       errorHandler(
  //         'Technical Error',
  //         'There may be some error occurred while processing the request. Please try after some time.',
  //       );
  //     }
  //   } else {
  //     if (!data.first_name) {
  //       errorHandler('Error occurred', 'Please enter your first name.');
  //     } else if (!data.email) {
  //       errorHandler('Error occurred', 'Please enter the email.');
  //     } else if (!reg.test(data.email)) {
  //       errorHandler('Error occurred', 'Please enter the valid email.');
  //     } else if (!data.password) {
  //       errorHandler('Error occurred', 'Please enter the password.');
  //     } else if (data.password.length < 6) {
  //       errorHandler(
  //         'Error occurred',
  //         'Please enter valid password of minimum 6 characters in length.',
  //       );
  //     } else if (!data.mobile) {
  //       errorHandler('Error occurred', 'Please enter the mobile.');
  //     } else if (data.mobile.length !== 10) {
  //       errorHandler('Error occurred', 'Please enter valid mobile number.');
  //     } else if (data.aadhaar_number && data.aadhaar_number?.length !== 12) {
  //       errorHandler('Error occurred', 'Please enter valid aadhaar number.');
  //     } else {
  //       if (data.role === 'AMC' && !AMCData.company_name) {
  //         errorHandler('Error occurred', 'Please enter the company name.');
  //       } else if (data.role === 'AMC' && !AMCData.plan_activation_date) {
  //         errorHandler('Error occurred', 'Please enter the plan activation date.');
  //       } else if (data.role === 'AMC' && !AMCData.plan_expired_date) {
  //         errorHandler('Error occurred', 'Please enter the plan expired date.');
  //       } else if (data.role === 'AMC' && device.length === 0) {
  //         errorHandler('Error occurred', 'Please enter the device.');
  //       } else if (data.role === 'AMC' && AMCData.pan_number && AMCData.pan_number?.length !== 10) {
  //         errorHandler('Error occurred', 'Please enter valid pan number.');
  //       } else if (data.role === 'AMC' && AMCData.gst_number && AMCData.gst_number?.length !== 15) {
  //         errorHandler('Error occurred', 'Please enter valid gst number.');
  //       } else {
  //         data.permanent_address = permanentAddress;
  //         data.permanent_city = permanentCity;
  //         data.permanent_state = permanentState;
  //         data.permanent_pincode = permanentPincode;
  //         const encryptedPassword = AES.encrypt(data.password, baseConfig.encryptionKey).toString();
  //         data.password = encryptedPassword;
  //         let userData = {};
  //         userData.userDetail = data;
  //         AMCData.device = JSON.stringify(device);
  //         if (!AMCData.date_of_registration) {
  //           AMCData.date_of_registration = currentDate;
  //         }
  //         userData.amcDetail = AMCData;
  //         const response = await registerUser(userData);
  //         if (response?.data?.success) {
  //           notification.success({
  //             message: 'Success',
  //             description: 'User Registration Successfully !!',
  //             duration: 4,
  //             className: 'notification-green',
  //           });
  //           refetch();
  //           navigate('/admin/user-management');
  //         } else {
  //           errorHandler(
  //             'Technical Error',
  //             'There may be some error occurred while processing the request. Please try after some time.',
  //           );
  //         }
  //       }
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (location.state) {
  //     setForEdit(location.state.forEdit);
  //     setMobile(location.state.mobile);
  //   }
  // }, [location?.state?.forEdit]);


  //New Features
  const { data, error, isLoading } = useGetUserByIdQuery(id);
  console.log(data);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const genderOption = [{
    label:'Male',
    value: 'MALE'
  },
  {
    label:'Female',
    value: 'FEMALE'
  },
  {
    label:'Other',
    value: 'OTHER'
  }
];

const UserType = [{
  label: 'Admin',
  value:'ADMIN'
},
{
  label:'Customer',
  value: 'USER',
},
{
  label:'AMC Customer',
  value: 'AMC',
},{
  label:'Engineer',
  value: 'ENGINEER',
}];
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [userType, setUserType] = React.useState('');

  const handleSelectChange = (event) => {
    setUserType(event.target.value);
  };

  const defaultValues = {
    "first_name": '',
    "middle_name": '',
    "last_name": '',
    "email": '',
    "mobile": '',
    "password": '',
    "date_of_birth": '',
    "date_of_registration": '',
    "gender": '',
    "img_url": '',
    "role": '',
    "aadhaar_number": '',
    "current_address": '',
    "current_state": '',
    "current_city": '',
    "current_pincode":'',
    "permanent_address": '',
    "permanent_state": '',
    "permanent_city": '',
    "permanent_pincode": '',
    "amcDetail": {"device": []}
}

  const {register,handleSubmit, control,reset,setValue,watch} = useForm({
    defaultValues,
    values : data?.data?.userDetail

  }
  );
  const onSubmit = async(data) => {
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
            refetch();
            navigate('/admin/user-management');
          } else {
            errorHandler(
              'Technical Error',
              'There may be some error occurred while processing the request. Please try after some time.',
            );
          }
        }  else {

        
    console.log(data);
    const encryptedPassword = AES.encrypt(data?.password, baseConfig.encryptionKey).toString();
    data.password = encryptedPassword;
    let userData = {};
            userData.userDetail = data;
            data.amcDetail.device = JSON.stringify(data.amcDetail?.device);
            // if (!AMCData.date_of_registration) {
            //   AMCData.date_of_registration = currentDate;
            // }
            // userData.amcDetail = AMCData;
            const response = await registerUser(data);
            if (response?.data?.success) {
              notification.success({
                message: 'Success',
                description: 'User Registration Successfully !!',
                duration: 4,
                className: 'notification-green',
              });
              refetch();
              navigate('/admin/user-management');
            } else {
              errorHandler(
                'Technical Error',
                'There may be some error occurred while processing the request. Please try after some time.',
              );
            }
          }
          }
  // useSelector((state) => state.admin.defaultUserData);
  const handleCheckBoxClicked = (event) => {
    console.log("inside----- "+event.target.checked );
    if (event.target.checked) {
      setValue('permanent_address',watchUser.current_address);
      setValue('permanent_city',watchUser.current_city);
      setValue('permanent_state',watchUser.current_state);
      setValue('permanent_pincode',watchUser.current_pincode);
    } else {
      setValue('permanent_address','');
      setValue('permanent_city','');
      setValue('permanent_state','');
      setValue('permanent_pincode','');
    }
    setIsCurrentSame(event.target.checked);
  };

  useEffect(() => {
    // reset form with user data
    // console.log(defaultUserData);
    if (location.state) {
          setForEdit(location.state.forEdit);
          setMobile(location.state.mobile);
          setId(location.state.id)
        }
    // if(data?.data?.userDetail) {
    //   const detail = data.data.userDetail;
    //         if(detail?.amcDetail){
    //           detail.amcDetail.detail = JSON.parse(detail.amcDetail.device);
    //         }
    //         setPrefillValue(detail);
    //       }
    //   reset(JSON.parse(JSON.stringify(data?.data?.rows?.userDetail)));
    // }
    // reset(JSON.parse(JSON.stringify({first_name:'Jitendra'})));
  }, [location?.state?.forEdit,location?.state?.id,isLoading]);
const watchUserType = watch('role');
const watchUser = watch();
console.log(watchUser);
  return (
    <>
      <UserLayout>
        <Card
          sx={{
            margin: '4% 0%',
            padding: '20px 10px',
            borderRadius: '8px',
            height: 'auto',
          }}
        >
          <CardHeader title='Register User'></CardHeader>
          <Divider />
            <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            
          <fieldset style={{border:'1px solid #e0e0e0', borderRadius:'10px'}}>
          <legend style={{width:'fit-content', textAlign:'center'}}>Personal Information</legend>
          <Grid container sx={{padding:'2%'}} spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
              name='first_name'
              control={control}
              render ={({
                field: { onChange, value, name },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
              <TextField id='firstName' 
               size="small" fullWidth 
               label='First Name'
               value={value}
               variant='outlined'
              onChange={onChange}
              inputRef={{...register('first_name')}}
              />
              )}
              rules={{ required: true }}
              />

            </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='middle_name'
              control={control}
              render ={({
                field: { onChange, value},
              }) => (
              <TextField id='middleName' 
              onChange={onChange}
              value={value}
               size="small" fullWidth label='Middle Name' variant='outlined' />
                )}/>  </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='last_name'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
              <TextField id='lastname' value={value} onChange={onChange} size="small" fullWidth label='Last Name' variant='outlined' />
  )}/> </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='email'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
              <TextField id='email' 
               onChange={onChange} 
               value={value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }} type="email" size="small" fullWidth label='Email Address' variant='outlined' />
              )}/>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='mobile'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
              <TextField id='mobileNumber' 
              onChange={onChange} 
              value={value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon />
                  </InputAdornment>
                ),
              }} type='mobile' size="small" fullWidth label='Mobile Number' variant='outlined' />
              )}/>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='date_of_birth'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField
                  id="dob"
                  value={moment(value).format('YYYY-MM-DD')}
                  label="Date Of Birth"
                  type="date"
                  size='small'
                  fullWidth
                  format='dd-mm-yyyy'
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  onChange={onChange} 
                />)}/>
                </Grid>
            
            <Grid item xs={12} sm={4}>
            <Controller
              name='password'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
            <FormControl fullWidth  size="small"  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange} 
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>)}/>
            </Grid>

            <Grid item xs={12} sm={4}>
            <Controller
              name='aadhaar_number'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField id='aadhaar_number' 
              onChange={onChange} 
              value={value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FingerprintIcon />
                  </InputAdornment>
                ),
              }} type='number' size="small" fullWidth label='Aadhaar Number' variant='outlined' />)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='role'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
            <FormControl size='small' fullWidth>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}UserType
          label="userType"
          onChange={onChange} 
        >
          {UserType.map((type) => (
              <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                        ))}
        </Select>
      </FormControl>)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='gender'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={onChange}
                  value={value}

                >
                   {genderOption.map((option) => (
                           <FormControlLabel  key={option.value} value={option.value} control={<Radio />} label={option.label} />
                        ))}
                </RadioGroup>
              </FormControl>
              )}/>
            </Grid>
          </Grid>
          </fieldset>
          { watchUserType && watchUserType !== 'ADMIN' && watchUserType !== 'ENGINEER' ?  <fieldset style={{border:'1px solid #e0e0e0', marginTop:'20px', borderRadius:'10px'}}>
          <legend style={{width:'fit-content', textAlign:'center'}}>Company Information</legend>
          <Grid container sx={{padding:'2%'}} spacing={2}>
          <Grid item xs={12} sm={4}>
          <Controller
              name='company_name'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
              <TextField id='company_name' 
              onChange={onChange} size="small" value ={value} fullWidth label='Company Name' variant='outlined' />
              )} />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='director_email'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField id='director_email' 
              onChange={onChange}
              value={value}

              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }} type="email" size="small" fullWidth label='Director Email Address' variant='outlined' />
               )} /> </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='admin_email'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField id='admin_email' 
              onChange={onChange}
              value={value}

              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }} type="email" size="small" fullWidth label='Admin Email Address' variant='outlined' />
              )} />
              </Grid>
            <Grid item xs={12} sm={4}>
            <Controller
              name='gst_number'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
          
          <TextField id='gst_number' value={value} onChange={onChange} size="small" fullWidth label='GST Number' variant='outlined' />
               )} /> </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
              name='pan_number'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField id='pan_number' value={value} onChange={onChange} size="small" fullWidth label='PAN Number' variant='outlined' />
              )} />
              </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
              name='date_of_registration'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
            <TextField
                  id="registration"
                  label="Date Of Registration"
                  type="date"
                  size='small'
                  fullWidth
                  onChange={onChange}
                  value={moment(value).format('YYYY-MM-DD')}
                />)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Controller
              name='contact_person_name'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField id='contact_person_name' value={value} onChange={onChange} size="small" fullWidth label='Contact Person Name' variant='outlined' />
               )} />
                </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
              name='contact_person_number'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField id='contact_person_number' 
              onChange={onChange}
              value={value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon />
                  </InputAdornment>
                ),
              }} type='number' size="small" fullWidth label='Contact Person Number' variant='outlined' />
               )}/>
                </Grid>
            
          </Grid>
          {watchUserType === 'AMC'? 
          <Grid container spacing={2} sx={{padding:'2%'}}>
          <Grid item xs={12} sm={4}>
          <Controller
              name='amcDetail.user_plan'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
              <TextField id='user_plan' value={value}
              onChange={onChange}  size="small" fullWidth label='Customer Plan' variant='outlined' />
              )} /></Grid>
            <Grid item xs={12} sm={4}>
              <Controller
              name='amcDetail.plan_activation_date'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
            <TextField
                  id="activationDate"
                  value={moment(value).format('YYYY-MM-DD')}
                  label="Plan Activation Date"
                  type="date"
                  size='small'
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onChange}
               
                />)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
              name='amcDetail.plan_expired_date'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
            <TextField
                  id="expireDate"
                  label="Plan Expired Date"
                  type="date"
                  fullWidth
                  value={moment(value).format('YYYY-MM-DD')}
                  size='small'
                  onChange={onChange}
                /> )} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
              name='amcDetail.device'
              control={control}
              defaultValue={[]}
              render ={({
                field: { onChange,value },
              }) => (
                <FormControl size='small' fullWidth>
                      <InputLabel id="demo-multiple-name-label">
                        Device
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={value ? value : []}
                        onChange={onChange}
                        input={<OutlinedInput label="Device" />}
                      >
                        {devices.map((device) => (
                          <MenuItem key={device} value={device}>
                            {device}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>)} />
                </Grid>
            </Grid>: ''}
            </fieldset> : ''}
            <fieldset style={{border:'1px solid #e0e0e0',marginTop:'20px', borderRadius:'10px'}}>
          <legend style={{width:'fit-content', textAlign:'center'}}>Address Information</legend>
            <Grid container sx={{padding:'2%'}} spacing={2} >
            <Grid item xs={12} sm={4}>
            <Controller
              name='current_address'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
            <TextField size='small' fullWidth
          id="current_address"
          label="Current Address"
          multiline
          rows={2}
          value={value}
          onChange={onChange}
        />)} />
              </Grid>
              <Grid item xs={12} sm={4}>
              <Controller
              name='current_city'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
              <TextField id='current_city' value={value} onChange={onChange} size="small" fullWidth label='Current City' variant='outlined' />
              )} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
              name='current_state'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
              <TextField id='current_state' value={value} onChange={onChange} size="small" fullWidth label='Current State' variant='outlined' />
              )} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
              name='current_pincode'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField id='current_pincode' value={value} onChange={onChange} size="small" fullWidth label='Current Pincode' variant='outlined' />
)} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox  
                    onChange={handleCheckBoxClicked} checked={isCurrentSame}/>} label="Visit address same as Current address" />
              </FormGroup> 
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
              name='permanent_address'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
            <TextField size='small' fullWidth
          id="permanent_address"
          label="Visit Address"
          multiline
          rows={2}
          value={value}
          onChange={onChange}
        />
        )} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
              name='permanent_city'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField id='permanent_city' value={value} onChange={onChange} size="small" fullWidth label='Visit City' variant='outlined' />
              )} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
              name='permanent_state'
              control={control}
              render ={({
                field: { onChange,value },
              }) => (
              <TextField id='permanent_state' value={value} onChange={onChange} size="small" fullWidth label='Visit State' variant='outlined' />
              )} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
              name='permanent_pincode'
              control={control}
              render ={({
                field: { onChange ,value},
              }) => (
              <TextField id='permanent_pincode' value={value} onChange={onChange} size="small" fullWidth label='Visit Pincode' variant='outlined' />
              )} />
              </Grid>
            </Grid>
            </fieldset>
            
            </CardContent>
            <Divider/>
            <CardActions>
              <Button variant="contained" style={{marginLeft:'auto'}} type='submit'>
              Save
              </Button>
    </CardActions>
    </form>
        </Card>
      </UserLayout>
    </>
  );
};

export default RegisterUser;

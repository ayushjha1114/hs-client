// import React, { useState } from "react";
// import { Input, notification } from "antd";
// import { AES } from "crypto-js";
// import jwt from "jsonwebtoken";
// import AuthLayout from "../../layout/Auth";
// import config from "../../config/server";
// import { useLoginMutation } from "../../services/admin";
// import Auth from "../../util/middleware/auth";
// import { useNavigate } from "react-router-dom";
// import { MobileOutlined, LockOutlined } from "@ant-design/icons";
// import {
//   FormControl,
//   InputLabel,
//   InputAdornment,
//   IconButton,
//   Grid,
//   TextField,
//   OutlinedInput,
// } from "@mui/material";
// import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { SET_LOADING, SET_SNACKBAR } from "./authSlice";
// import { useDispatch } from "react-redux";

// const baseConfig = config[config.serviceServerName["auth"]];

// const LoginPage = (props) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   let errorHandler = (message, description) => {
//     setTimeout(() => {
//       notification.error({
//         message,
//         description,
//         duration: 8,
//         className: "notification-error",
//       });
//     }, 50);
//   };

//   const handleMobileChange = (e) => {
//     const { value } = e.target;
//     const reg = /^\d{10}$/;

//     if (reg.test(value)) {
//       setMobile(value);
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const { value } = e.target;
//     setPassword(value);
//   };

//   const [login] = useLoginMutation();
//   const handleLogin = async () => {
//     if (!mobile || !password) {
//       if (!mobile) {
//         dispatch(
//           SET_SNACKBAR({
//             open: true,
//             message: 'Please enter your 10 digit Mobile number.',
//             variant: "error",
//           })
//         );
//       } else if (!password) {
//         dispatch(
//           SET_SNACKBAR({
//             open: true,
//             message: 'Please enter the password.',
//             variant: "error",
//           })
//         );
//       }
//     } else if (password.length < 6) {
//       dispatch(
//         SET_SNACKBAR({
//           open: true,
//           message: 'Please enter valid password of minimum 6 characters in length.',
//           variant: "error",
//         })
//       );
//     } else {
//       dispatch(SET_LOADING({ data: true }));
//       const encryptedPassword = AES.encrypt(
//         password,
//         baseConfig.encryptionKey
//       ).toString();
//       const response = await login({
//         mobile,
//         password: encryptedPassword,
//       });
//       if (response?.error?.data?.success === false) {
//         dispatch(SET_LOADING({ data: false }));
//         dispatch(
//           SET_SNACKBAR({
//             open: true,
//             message: response?.error?.data?.message,
//             variant: "error",
//           })
//         );
//       } else if (response?.data?.success === true) {
//         dispatch(SET_LOADING({ data: false }));
//         const decodedToken = jwt.decode(response.data.token);
//         Auth.setUserName(decodedToken.name);

//         if (decodedToken.role === "ADMIN") {
//           Auth.setAdminAccessToken(response.data.token);
//           Auth.setRole(decodedToken.role);
//           window.localStorage.setItem("login_at", Date.now());
//           navigate("/admin/dashboard");
//         } else if (decodedToken.role === "USER") {
//           Auth.setAccessToken(response.data.token);
//           Auth.setRole(decodedToken.role);
//           window.localStorage.setItem("login_at", Date.now());
//           navigate("/dashboard");
//         }
//       }
//     }
//   };

//   const handleBackToLogin = () => {
//     navigate("/login");
//   };

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//       <AuthLayout>
//         <div className="loginHeader">
//           <h1>Login</h1>
//           <i class="fa-brands fa-google loginGoogle"></i>
//         </div>
//         <div className="loginContainer">
//           {/* <Grid item xs={12} sm={4}>
//             <TextField
//               id="mobileNumber"
//               onChange={(e) => handleMobileChange(e)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PhoneIphoneIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               type="mobile"
//               size="small"
//               fullWidth
//               label="Mobile Number"
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <FormControl fullWidth size="small" variant="outlined">
//               <InputLabel htmlFor="outlined-adornment-password">
//                 Password
//               </InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password"
//                 type={showPassword ? "text" : "password"}
//                 onChange={handlePasswordChange}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//               />
//             </FormControl>
//           </Grid> */}
//           <Input
//             className="loginInput"
//             size="large"
//             placeholder="Mobile Number"
//             prefix={<MobileOutlined className="loginMobileIcon" />}
//             maxLength={10}
//             onChange={(e) => handleMobileChange(e)}
//           />
//           <Input.Password
//             className="loginInput loginPassword"
//             size="large"
//             placeholder="Password"
//             prefix={<LockOutlined className="loginMobileIcon" />}
//             maxLength={10}
//             onChange={handlePasswordChange}
//           />
//           <button className="loginBtn" onClick={handleLogin}>
//             Login
//           </button>
//           <a className="back-to-home" onClick={handleBackToLogin}>
//             Back to home <i class="fa-solid fa-arrow-right"></i>
//           </a>
//           <a className="back-to-home" onClick={handleBackToLogin}>
//             Register
//           </a>
//         </div>
//       </AuthLayout>
//     </>
//   );
// };

// export default LoginPage;

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {InputAdornment,OutlinedInput,InputLabel,IconButton,FormHelperText,FormControl} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthLayout from '../../layout/Auth';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AES } from "crypto-js";
import jwt from "jsonwebtoken";
import config from "../../config/server";
import { useLoginMutation } from "../../services/admin";
import Auth from "../../util/middleware/auth";
import { useNavigate } from "react-router-dom";
import { SET_LOADING, SET_SNACKBAR } from "./authSlice";
import { useDispatch } from "react-redux";
const baseConfig = config[config.serviceServerName["auth"]];
import { useForm, Controller } from "react-hook-form";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        DGSOFT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: {mobile:'',password:''},
  });


  const onSubmit = async(data) => {
console.log(data);
    dispatch(SET_LOADING({ data: true }));
        const credential = { mobile : data.mobile,
      password: AES.encrypt(
        data.password,
        baseConfig.encryptionKey
      ).toString() }
        const response = await login(credential);
        if (response?.error?.data?.success === false) {
          dispatch(SET_LOADING({ data: false }));
          dispatch(
            SET_SNACKBAR({
              open: true,
              message: response?.error?.data?.message,
              variant: "error",
            })
          );
        } else if (response?.data?.success === true) {
          dispatch(SET_LOADING({ data: false }));
          const decodedToken = jwt.decode(response.data.token);
          Auth.setUserName(decodedToken.name);
  
          if (decodedToken.role === "ADMIN") {
            Auth.setAdminAccessToken(response.data.token);
            Auth.setRole(decodedToken.role);
            window.localStorage.setItem("login_at", Date.now());
            navigate("/admin/dashboard");
          } else if (decodedToken.role === "USER") {
            Auth.setAccessToken(response.data.token);
            Auth.setRole(decodedToken.role);
            window.localStorage.setItem("login_at", Date.now());
            navigate("/dashboard");
          }
        }
  };

  return (
    <AuthLayout>
     
    <ThemeProvider theme={theme}>
      
      <Container  maxWidth="sm">
      <Card sx={{mt:8,mr:8,mb:2,ml:8 ,borderRadius:2}} >
      <Container  maxWidth="xs">
        <Box
          sx={{
            marginTop:4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar variant='square' sx={{width:'auto'}} src="/assets/images/DGSoft-logo.png">
          </Avatar>
          <Typography sx={{ mt: 1 }} component="h1" variant="h5">
            Sign in
          </Typography>
          <CardContent>
          <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
                      name="mobile"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Mobile Number is required.",
                        },
                        maxLength: {
                          value: 10,
                          message: "Mobile Number should be length of 10",
                        },
                        minLength: {
                          value: 10,
                          message: "Mobile Number should be length of 10",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                        sx={{mt:2}}
                          id="mobileNumber"
                          onChange={onChange}
                          value={value}
                          error={!!error}
                          helperText={error?.message}
                          placeholder='Enter registered mobile number.'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIphoneIcon />
                              </InputAdornment>
                            ),
                          }}
                          type="number"
                          fullWidth
                          label="Mobile Number"
                          variant="outlined"
                          autoFocus
                          autoComplete="mobile-number"
                        />
                      )}
                    />
             <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Password is required.",
                        },
                        maxLength: {
                          value: 18,
                          message:
                            "Please enter valid password of maximum 18 characters in length.",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "Please enter valid password of minimum 6 characters in length.",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControl
                          fullWidth
                          error={!!error}
                          variant="outlined"
                          sx={{mt:2}}
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            autoComplete="current-password"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </form>
          </Box>
          
          </CardContent>
        </Box>
        </Container>
       </Card>

        <Copyright sx={{ mb: 4 }} />
      </Container>
      
    </ThemeProvider>
    </AuthLayout>
  );
}

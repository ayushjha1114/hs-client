import React, { useState } from "react";
import { Input, notification } from "antd";
import { AES } from "crypto-js";
import jwt from "jsonwebtoken";
import AuthLayout from "../../layout/Auth";
import config from "../../config/server";
import { useLoginMutation } from "../../services/admin";
import Auth from "../../util/middleware/auth";
import { useNavigate } from "react-router-dom";
import { MobileOutlined, LockOutlined } from "@ant-design/icons";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Grid,
  TextField,
  OutlinedInput,
} from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SET_LOADING, SET_SNACKBAR } from "./authSlice";
import { useDispatch } from "react-redux";

const baseConfig = config[config.serviceServerName["auth"]];

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  let errorHandler = (message, description) => {
    setTimeout(() => {
      notification.error({
        message,
        description,
        duration: 8,
        className: "notification-error",
      });
    }, 50);
  };

  const handleMobileChange = (e) => {
    const { value } = e.target;
    const reg = /^\d{10}$/;

    if (reg.test(value)) {
      setMobile(value);
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const [login] = useLoginMutation();
  const handleLogin = async () => {
    if (!mobile || !password) {
      if (!mobile) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: 'Please enter your 10 digit Mobile number.',
            variant: "error",
          })
        );
      } else if (!password) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: 'Please enter the password.',
            variant: "error",
          })
        );
      }
    } else if (password.length < 6) {
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: 'Please enter valid password of minimum 6 characters in length.',
          variant: "error",
        })
      );
    } else {
      dispatch(SET_LOADING({ data: true }));
      const encryptedPassword = AES.encrypt(
        password,
        baseConfig.encryptionKey
      ).toString();
      const response = await login({
        mobile,
        password: encryptedPassword,
      });
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
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <AuthLayout>
        <div className="loginHeader">
          <h1>Login</h1>
          <i class="fa-brands fa-google loginGoogle"></i>
        </div>
        <div className="loginContainer">
          {/* <Grid item xs={12} sm={4}>
            <TextField
              id="mobileNumber"
              onChange={(e) => handleMobileChange(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon />
                  </InputAdornment>
                ),
              }}
              type="mobile"
              size="small"
              fullWidth
              label="Mobile Number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={handlePasswordChange}
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
            </FormControl>
          </Grid> */}
          <Input
            className="loginInput"
            size="large"
            placeholder="Mobile Number"
            prefix={<MobileOutlined className="loginMobileIcon" />}
            maxLength={10}
            onChange={(e) => handleMobileChange(e)}
          />
          <Input.Password
            className="loginInput loginPassword"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined className="loginMobileIcon" />}
            maxLength={10}
            onChange={handlePasswordChange}
          />
          <button className="loginBtn" onClick={handleLogin}>
            Login
          </button>
          <a className="back-to-home" onClick={handleBackToLogin}>
            Back to home <i class="fa-solid fa-arrow-right"></i>
          </a>
          <a className="back-to-home" onClick={handleBackToLogin}>
            Register
          </a>
        </div>
      </AuthLayout>
    </>
  );
};

export default LoginPage;

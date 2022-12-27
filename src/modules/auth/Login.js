import React, { useState } from 'react';
import { Input, notification } from 'antd';
import { AES } from 'crypto-js';
import jwt from 'jsonwebtoken';
import AuthLayout from '../../layout/Auth';
import config from '../../config/server';
import { useLoginMutation } from "../../services/admin";
import Auth from '../../util/middleware/auth';
import { useNavigate } from 'react-router-dom';

const baseConfig = config[config.serviceServerName['auth']];


const LoginPage = props => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

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
        errorHandler(
          'Error occurred',
          'Please enter your 10 digit Mobile number.'
        )
      } else if (!password) {
        errorHandler(
          'Error occurred',
          'Please enter the password.'
        )
      }
    } else if (password.length < 6) {
      errorHandler(
        'Error occurred',
        'Please enter valid password of minimum 6 characters in length.'
      )
    } else {
      const encryptedPassword = AES.encrypt(password, baseConfig.encryptionKey).toString();
      const response = await login({
        mobile,
        password: encryptedPassword
      });
      if (response?.error?.data?.success === false) {
        errorHandler(
          'Error occurred',
          response.error.data.message
        )
      } else if (response?.data?.success === true) {
        const decodedToken = jwt.decode(response.data.token);
        console.log("🚀 ~ file: Login.js:73 ~ handleLogin ~ decodedToken", decodedToken)
        Auth.setUserName(decodedToken.name);
        
        if (decodedToken.role === 'ADMIN') {
          Auth.setAdminAccessToken(response.data.token);
          Auth.setRole(decodedToken.role);
          window.localStorage.setItem('login_at', Date.now());
          navigate('/admin/dashboard');
        } else if (decodedToken.role === 'USER') {
          Auth.setAccessToken(response.data.token);
          Auth.setRole(decodedToken.role);
          window.localStorage.setItem('login_at', Date.now());
          navigate('/dashboard');
        }
      }
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <AuthLayout>
        <div className="loginHeader">
          <h1>Login</h1>
          <i class="fa-brands fa-google loginGoogle"></i>
        </div>
        <div className="loginContainer">
          <Input 
            className="loginInput" 
            size="large" 
            placeholder="Mobile Number" 
            prefix={<i class="fa-solid fa-mobile-screen loginMobileIcon"></i>} 
            maxLength={10}
            onChange={(e) => handleMobileChange(e)}
          />
          <Input.Password
            className="loginInput loginPassword" 
            size="large" 
            placeholder="Password"
            prefix={<i class="fa-solid fa-lock loginMobileIcon"></i>} 
            maxLength={10}
            onChange={handlePasswordChange}
          />
          <button className="loginBtn" onClick={handleLogin}>Login</button>
          <a className="back-to-home" onClick={handleBackToLogin}>Back to home <i class="fa-solid fa-arrow-right"></i></a>
          <a className="back-to-home" onClick={handleBackToLogin}>Register</a>
        </div>
      </AuthLayout>
    </>
  )
}

export default LoginPage
import React, { useState } from 'react';
import { Input } from 'antd';
import AuthLayout from '../../layout/Auth';


const LoginPage = props => {

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setValue(inputValue);
    }
  };

  const onClickBackToLogin = () => {
    // browserHistory.push('/');
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
            onChange={handleChange}
            value={value}
          />
          <Input 
            className="loginInput loginPassword" 
            size="large" 
            placeholder="Password"
            prefix={<i class="fa-solid fa-lock loginMobileIcon"></i>} 
            maxLength={10}
            onChange={handleChange}
            value={value}
          />
          <button className="loginBtn">Login</button>
          <a className="back-to-home" onClick={onClickBackToLogin}>Back to home <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </AuthLayout>
    </>
  )
}

export default LoginPage
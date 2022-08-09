import React, { useEffect } from 'react';
import { notification } from 'antd';
import config from '../../config/server';
import AuthLayout from '../../layout/Auth';

const baseConfig = config[config.serviceServerName['auth']];

let LoginPage = props => {

  // fn to display error notification using antd libraray
  let errorHandler = (message, description) => {
    setTimeout(() => {
      notification.error({
        message,
        description,
        duration: 8,
        className: "notification-error"
      });
      props.authInvalidateLoginForm(false);
      props.authSubmitLoginForm(false);
    }, 50)
  }

  //fn called when user clicked on Login button
  let handleSubmit = event => {
    event.preventDefault();
    window.location.href = '/dashboard';
    // if (!login_id || !password) {
    //   if (!login_id) {
    //     errorHandler(
    //       'Error occurred',
    //       'Please enter your User ID.'
    //     )
    //   } else if (!password) {
    //     errorHandler(
    //       'Error occurred',
    //       'Please enter the password.'
    //     )
    //   }
    // } else if (password.length < 6) {
    //   errorHandler(
    //     'Error occurred',
    //     'Please enter valid password of minimum 6 characters in length.'
    //   )
    // }
  }

  /** Fn called when there is a change in login form fields 
   * and is used to use the login state and change the state variable values 
   * **/
  let handleInputChange = (event, field) => {
    let value = event.target.value;
    props.authUpdateLoginFormField({ field, value });
  }

  /** Fn called when user want to reset/recover password **/
  let generateOtp = event => {
    event.preventDefault();
    props.authInvalidateLoginForm(false);
  }

  /**
   * useEffect is hook function called to enable or disable login button state
   */
  // useEffect(() => {
  //   document.getElementById("loginbtn").disabled = !validationFlag;
  // }, [validationFlag]);

  /**
   * useEffect is hook function called to enable or disable the form invalidate state
   */
  // useEffect(() => {
  //   if (login_id && password) {
  //     props.authInvalidateLoginForm(true);
  //   } else {
  //     props.authInvalidateLoginForm(false);
  //   }
  // }, [login_id, password]);

  const handleSSOLogin = () => {
    // signIn();
  }

  return (
    <AuthLayout>
      <div className="tcp-form-wrapper">
        {/* <h1>Login</h1> */}
        <div className="tcp-logo-block">
          <img src="/assets/images/intel-icon.svg" alt="" />
          <h2>SOME HEADING</h2>
        </div>
        <div className="tcp-login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-block">
              <label htmlFor="">User ID</label>
              <input
                id="login_id"
                type="number"
                name="login_id"
                placeholder="Enter your User ID"
                className="form-control"
                autoFocus
                // defaultValue={login_id}
                onChange={e => {
                  handleInputChange(e, 'login_id')
                }}
              />
            </div>
            <div className="form-block">
              <label htmlFor="">Password</label>
              <input
                id="passwordlogin"
                type="password"
                name="passwordlogin"
                placeholder="Enter Password"
                className="form-control"
                // defaultValue={password}
                onChange={e => {
                  handleInputChange(e, 'password')
                }}
              />
            </div>
            <div className="form-block forgot-text">
              <a onClick={generateOtp}>Register/Forgot Password ?</a>
              <br/>
              <a className="login-with-sso" onClick={handleSSOLogin}>Admin Login</a>
            </div>
            <div className="bottom-btn">
              <button type="submit" name="singlebutton" id="loginbtn" className="default-btn" /* disabled */>Login</button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginPage

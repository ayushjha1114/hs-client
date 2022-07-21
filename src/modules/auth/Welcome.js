import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Auth from '../../util/middleware/auth';
import * as Action from './action';

let WelcomePage = (props) => {
  const navigate = useNavigate();

  const { fetchAppLevelConfiguration } = props;


  useEffect(() => {
    fetchAppLevelConfiguration();
    if (Auth.loggedIn()) {
      navigate('/distributor/dashboard');
    } else if (Auth.adminLoggedIn() && Auth.checkAdminLogin()) {
      navigate('/admin/dashboard');
    }
  }, []);

  return (
    <div className="-form-wrapper">
      <h1>Login</h1>
      <div className="-logo-block">
        <img src="assets/images/-logo.svg" alt="" />
        <h2>Pxzxzx PORTAL</h2>
      </div>
      <div className="distributer-btn">
        <Link to="/auth/login" className="default-btn"> Login</Link>
        <>
          <br />
        </>
      </div>
    </div>
  )
}

const mapStateToProps = (/* state */) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAppLevelConfiguration: () =>
      dispatch(Action.fetchAppLevelSettings()),
  }
}

const ConnectWelcomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage)

export default ConnectWelcomePage;

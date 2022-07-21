import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Auth from '../../util/middleware/auth';
import * as Action from './action';
import AuthLayout from '../../layout/Auth';

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
    <AuthLayout>
      <div className="tcp-form-wrapper">
        <h1>Login</h1>
        <div className="tcp-logo-block">
          <img src="assets/images/intel-icon.svg" alt="" />
          <h2>SOME HEADING</h2>
        </div>
        <div className="distributer-btn">
          <Link to="/login" className="default-btn"> Login</Link>
          <>
            <br />
            <a href="/" className="sso-login" /* onClick={} */>
            Admin Login
          </a>
          </>
        </div>
      </div>

    </AuthLayout>
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

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import config from '../../config/server';
import useAuth from './hooks/useAuth';
import Auth from '../../util/middleware/auth';
import * as Action from './action';

let WelcomePage = (props) => {

  const { fetchAppLevelConfiguration } = props;

  const { signIn } = useAuth({
    provider: config.sso_login.provider,
    options: {
      userPoolId: config.sso_login.userPoolId,
      userPoolWebClientId: config.sso_login.userPoolWebClientId,
      oauth: {
        domain: config.sso_login.domain,
        scope: config.sso_login.scope,
        redirectSignIn: config.sso_login.redirectSignIn,
        redirectSignOut: config.sso_login.redirectSignOut,
        region: config.sso_login.region,
        responseType: config.sso_login.responseType
      }
    }
  });

  const handleSSOLogin = () => {
    signIn();
  }

  useEffect(() => {
    fetchAppLevelConfiguration();
    if (Auth.loggedIn()) {
      browserHistory.push('/distributor/dashboard');
    } else if (Auth.adminLoggedIn() && Auth.checkAdminLogin()) {
      browserHistory.push('/admin/dashboard');
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
          <a className="sso-login" onClick={handleSSOLogin}>
            Login with SSO
          </a>
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

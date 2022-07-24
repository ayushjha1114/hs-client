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
      <div className="homeContainer">
          <img src="assets/images/home.png" alt="" style={{ maxWidth:'100%', height: 'auto'}} />
        <div className="HomeNavBarImg">
          <img src="assets/images/fake.svg" alt="" />
        </div>
        <div className="HomeNavBar">
          <Link to="/login" className="navLink"> Home</Link>
          <Link to="/login" className="navLink"> Product</Link>
          <Link to="/login" className="navLink"> Service</Link>
          <Link to="/login" className="navLink"> AMC</Link>
          <Link to="/login" className="navLink"> Tech News</Link>
          <Link to="/login" className="navLink"> About Us</Link>
          <Link to="/login" className="navLink"> Contact Us</Link>
          <Link to="/login" className="navLoginBtn"> Login</Link>
        </div>
        <div className="homeBody">
          <h2>        
            Communicate.
            Collaborate. Create.
          </h2>
          <p>
            XYZ provides an effective and powerful way to manage your projects
          </p>
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

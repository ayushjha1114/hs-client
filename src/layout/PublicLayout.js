import React from 'react';
import { Link } from 'react-router-dom';

let PublicPage = (props) => {

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
          <Link to="/amc-plans" className="navLink"> AMC</Link>
          <Link to="/login" className="navLink"> Tech News</Link>
          <Link to="/login" className="navLink"> About Us</Link>
          <Link to="/login" className="navLink"> Contact Us</Link>
          <Link to="/login" className="navLoginBtn"> Login</Link>
        </div>
        {props.children}
      </div>
  )
}

export default PublicPage;

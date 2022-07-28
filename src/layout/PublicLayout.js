import React from 'react';
import { Link } from 'react-router-dom';

let PublicPage = (props) => {

  return (
      <div className="homeContainer">
          <img src="assets/images/home.png" alt="" style={{ maxWidth:'100%', height: 'auto', marginTop: '100px'}} />
        {/* <div className='HomeNavBar'> */}
          <div className="HomeNavBarImg">
            <img src="assets/images/DGsoft-logo.svg" alt="" style={{ maxWidth: '25%' }}/>
          </div>
          <div className="HomeNavBarItem">
            <Link to="/" className="navLink"> Home</Link>
            <Link to="/products" className="navLink"> Product</Link>
            <Link to="/services" className="navLink"> Service</Link>
            <Link to="/amc-plans" className="navLink"> AMC</Link>
            <Link to="/" className="navLink"> Tech News</Link>
            <Link to="/about-us" className="navLink"> About Us</Link>
            <Link to="/contact-us" className="navLink"> Contact Us</Link>
            <Link to="/login" className="navLoginBtn"> Login</Link>
          </div>
        {/* </div> */}
        {props.children}
      </div>
  )
}

export default PublicPage;

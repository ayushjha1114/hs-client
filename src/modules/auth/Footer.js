import React from "react";

let Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerTop">
        <h1>AAAAA MM DOOOOOO</h1>
        <img
          src="assets/images/footer-side-image.png"
          alt=""
          style={{ maxWidth: "15%", marginLeft: "55%" }}
        />
      </div>
      <div className="footerBottom">
        <img
          src="assets/images/DGSoft-footer.png"
          alt=""
        />
        <div className="fListContainer">
          <ul className="footerList1">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Services</li>
          </ul>
          <div className="footerList2">
            <ul>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
          <ul className="footerList3">
            <li>
              <p>Let's chat!</p>
            </li>
            <li>help.support@dgsoft.net</li>
            <li>
              <i class="fa-brands fa-square-facebook"></i> &nbsp;
              <i class="fa-brands fa-twitter"></i> &nbsp;
              <i class="fa-brands fa-instagram"></i> &nbsp;
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

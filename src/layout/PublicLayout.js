import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

const menu = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
  },
  {
    label: <Link to="/products">Product</Link>,
    key: "products",
  },
  {
    label: <Link to="/services">Service</Link>,
    key: "services",
  },
  {
    label: <Link to="/amc-plans-details">AMC Plans</Link>,
    key: "amc-plans-details",
  },
  {
    label: <Link to="/about-us">About Us</Link>,
    key: "about-us",
  },
  {
    label: <Link to="/contact-us">Contact Us</Link>,
    key: "contact-us",
  },
  {
    label: <Link to="/login">Login</Link>,
    key: "login",
  },
];

let PublicPage = (props) => {
  return (
    <>
      <Layout theme="light" className="layout">
        <Header className="layout-header">
          <div className="logo">
            <img src="/assets/images/DGSoft-logo.png" alt="" />
          </div>
          <Menu className="header-menu" theme="light" mode="horizontal" items={menu} />
        </Header>
        <Content>
          <div className="site-layout-content ">{props.children}</div>
        </Content>
        <Footer className="layout-footer">
          <div className="footerContainer">
            <div className="footerBottom">
              <img src="/assets/images/DGSoft-footer.png" alt="" />
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
                    <i className="fa-brands fa-square-facebook"></i> &nbsp;
                    <i className="fa-brands fa-twitter"></i> &nbsp;
                    <i className="fa-brands fa-instagram"></i> &nbsp;
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Footer>
      </Layout>
    </>
  );
};

export default PublicPage;

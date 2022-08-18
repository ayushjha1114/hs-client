import React from "react";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

const menu = [
  { label: "Home", key: "/" },
  { label: "Product", key: "/products" },
  { label: "Service", key: "/services" },
  { label: "AMC", key: "/amc-plans" },
  { label: "About Us", key: "/about-us" },
  { label: "Contact Us", key: "/contact-us" },
  { label: "Login", key: "/login" },
];

let PublicPage = (props) => {
  return (
    <>
      <Layout theme="light" className="layout">
        <Header className="layout-header">
          <div className="logo">
            <img src="/assets/images/DGSoft-logo.png" alt="" />
          </div>
          <Menu theme="light" mode="horizontal" items={menu} />
        </Header>
        <Content>
          <div className="site-layout-content ">{props.children}</div>
        </Content>

        <Footer className="layout-footer">
          <div className="footerContainer">
            <div className="footerTop">
              <h1>AAAAA MM DOOOOOO</h1>
              <img
                src="/assets/images/footer-side-image.png"
                alt=""
                style={{ maxWidth: "15%", marginLeft: "55%" }}
              />
            </div>
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

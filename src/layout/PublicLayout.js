// import React from "react";
// import { Link } from "react-router-dom";
// import { Layout, Menu } from "antd";
// const { Header, Content, Footer } = Layout;

// const menu = [
//   {
//     label: <Link to="/">Home</Link>,
//     key: "home",
//   },
//   {
//     label: <Link to="/products">Product</Link>,
//     key: "products",
//   },
//   {
//     label: <Link to="/services">Service</Link>,
//     key: "services",
//   },
//   {
//     label: <Link to="/amc-plans-details">AMC Plans</Link>,
//     key: "amc-plans-details",
//   },
//   {
//     label: <Link to="/about-us">About Us</Link>,
//     key: "about-us",
//   },
//   {
//     label: <Link to="/contact-us">Contact Us</Link>,
//     key: "contact-us",
//   },
//   {
//     label: <Link to="/login">Login</Link>,
//     key: "login",
//   },
// ];

// let PublicPage = (props) => {
//   return (
//     <>
//       <Layout theme="light" className="layout">
//         <Header className="layout-header">
//           <div className="logo">
//             <img src="/assets/images/DGSoft-logo.png" alt="" />
//           </div>
//           <Menu className="header-menu" theme="light" mode="horizontal" items={menu} />
//         </Header>
//         <Content>
//           <div className="site-layout-content ">{props.children}</div>
//         </Content>
//         <Footer className="layout-footer">
//           <div className="footerContainer">
//             <div className="footerBottom">
//               <img src="/assets/images/DGSoft-footer.png" alt="" />
//               <div className="fListContainer">
//                 <ul className="footerList1">
//                   <li>About Us</li>
//                   <li>Contact Us</li>
//                   <li>Services</li>
//                 </ul>
//                 <div className="footerList2">
//                   <ul>
//                     <li>Terms and Conditions</li>
//                     <li>Privacy Policy</li>
//                     <li>Cookie Policy</li>
//                   </ul>
//                 </div>
//                 <ul className="footerList3">
//                   <li>
//                     <p>Let's chat!</p>
//                   </li>
//                   <li>help.support@dgsoft.net</li>
//                   <li>
//                     <i className="fa-brands fa-square-facebook"></i> &nbsp;
//                     <i className="fa-brands fa-twitter"></i> &nbsp;
//                     <i className="fa-brands fa-instagram"></i> &nbsp;
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </Footer>
//       </Layout>
//     </>
//   );
// };

// export default PublicPage;

import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import Auth from '../util/middleware/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import {AccountCircle,Email,Code} from '@mui/icons-material';
import AppFooter from './Footer';
import ResponsiveAppBar from './HeaderLayout';


const PublicPage = (props) => {

    return (
        <React.Fragment>
          <CssBaseline />
          <ResponsiveAppBar/>
          <Box component="main" sx={{mt:3}} >
          {props.children}
          </Box>
         <AppFooter/>
      </React.Fragment>
      );
}
export default PublicPage;

// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import appLevelConfig from '../config';
// import Auth from '../util/middleware/auth';
// import {
//     MenuFoldOutlined,
//     MenuUnfoldOutlined,
//   } from '@ant-design/icons';
//   import { Button } from 'antd';
//   import Navigation from './NavLayout.js';

// const appConfig = appLevelConfig.app_level_configuration;

// let HeaderLayout = props => {
//     const navigate = useNavigate();
//     const [isAdmin] = useState(props.isAdminLogin);
//     const [activeCount, setActiveCount] = useState(0)
//     const [profileFeatureFlag, setProfileFeatureFlag] = useState(true);
//     const [changePasswordFeatureFlag, setChangePasswordFeatureFlag] = useState(true);

//     const handleLogoutClick = () => {
//         Auth.logout();
//         navigate('/login')
//     };
//     const [open, setOpen] = useState(false);
//     const myRef = useRef();

//     const handleMenuClick = (e) => {
//         e.preventDefault();
//         setOpen(!open);
//     };

//     const handleClickOutside = e => {
//         if (!myRef.current.contains(e.target)) {
//             setOpen(false);
//         }
//     };

//     const handleSubMenu = () => {
//         setOpen(false);
//     }

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     });
//     let screenWidth = window.screen.width;
//     const toggleLeftNavbar = () => {
//         if (screenWidth <= 767) {
//             document.querySelector('body').classList.add('show-sidebar');
//         } else {
//             document.querySelector('body').classList.remove('hide-sidebar');
//         }
//     }
//     const [collapsed, setCollapsed] = useState(false);
//     const toggleCollapsed = () => {
//       setCollapsed(!collapsed);
//       props.onChangeCollapsed(collapsed);
//     };

//     return (
//         <>
//         <div className="dashboard-header">
//             <Button 
//           type="link"
//           onClick={toggleCollapsed}
//           style={{border:'none',boxShadow: 'none'}}
          
//         >
//           {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 'x-large' }} /> : <MenuFoldOutlined  style={{ fontSize: 'x-large' }}/>}
//         </Button>
//         <div className="header-logo">
//         <img src="/assets/images/DGSoft-logo.png" alt="" style={{ width: "18%"}} />
//            </div>
//             <div className="header-right">
//                 <span>{window.localStorage.getItem('user_name') && window.localStorage.getItem('user_name').toUpperCase()}</span> 
//                 <div ref={myRef} className="user-img">
//                     <img
//                         onClick={e => handleMenuClick(e)}
//                         src="/assets/images/user.svg"
//                         alt=""
//                     />
//                     <ul className={`sub-menu ${isAdmin === 'admin' ? 'admin-sub-menu' : ''}`} onClick={handleSubMenu} style={{ display: open ? 'block' : 'none' }}>
//                         {isAdmin === 'admin' ?
//                             <>
//                                 {
//                                     window.localStorage.getItem('role') === 'ADMIN' &&
//                                     <>
//                                         <li>
//                                             <div className="change-password">
//                                                 <Link to="/admin/user-management">
//                                                     <img src="/assets/images/user-management.svg" alt="" style={{ width: '13px' }} /> <em>User Management</em></Link>
//                                             </div>
//                                         </li>
//                                     </>
//                                 }
//                                 <li onClick={handleSubMenu}>
//                                     <div className="change-password">
//                                         <a href="#" onClick={handleLogoutClick}>
//                                             <img src="/assets/images/logout.svg" alt="" style={{ top: '0px', left: '-9px', width: ' 28px' }} /><em>Logout</em></a>
//                                     </div>
//                                 </li>
//                             </> :
//                             <>
//                                 {profileFeatureFlag && 
//                                     (
//                                         <li>
//                                             <div className="change-password">
//                                                 <Link to="/distributor/profile">
//                                                     <img src="/assets/images/profile.svg" alt="" /> <em>Profile</em></Link>
//                                             </div>
//                                         </li>
//                                     )
//                                 }
//                                 {changePasswordFeatureFlag && 
//                                     (
//                                         <li>
//                                             <div className="change-password">
//                                                 <Link to="/distributor/change-password">
//                                                     <img src="/assets/images/change-password.svg" alt="" /> <em>Change Password</em></Link>
//                                             </div>
//                                         </li>
//                                     )
//                                 }
//                                 <li>
//                                     <div className="change-password">
//                                         <a href="#" onClick={handleLogoutClick}>
//                                             <img src="/assets/images/logout.svg" alt="" /> <em>Logout</em></a>
//                                     </div>
//                                 </li>
//                             </>
//                         }
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         </>
//     )

// }

// export default HeaderLayout;
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
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
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function HeaderLayout(props) {
  

  
}


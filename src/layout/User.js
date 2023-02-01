import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import Auth from '../util/middleware/auth';
import { useLocation, useNavigate } from 'react-router-dom';
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';

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
const menuList = [{
   label:'Dashboard',link:'dashboard',icon: <DashboardIcon color='primary'/>
},{
    label:'User',link:'user-management',icon: <AccountBoxIcon color='primary' />
},{
    label:'Tickets',link:'tickets',icon: <ConfirmationNumberIcon color='primary'/>
}
,{
    label:'Services',link:'service',icon: <DisplaySettingsIcon color='primary'/>
},{
    label:'Brand',link:'brand',icon: <BrandingWatermarkIcon color='primary' />
}]

let UserLayout = (props) => {
    let location = useLocation();
    const navigate = useNavigate();

    let access_token = Auth.getAccessToken();
    const isPathAdmin = location.pathname.split("/")[1];
    const handleLogoutClick = () => {
                Auth.logout();
                navigate('/login')
            };

    let login_id = '';
    if (isPathAdmin !== 'admin') {
        if (!access_token) {
            // browserHistory.push("/");
        } else {
            login_id = jwt.decode(access_token).login_id;
        }
    } else if (isPathAdmin === 'admin') {
            const isAdminLoggedIn = Auth.adminLoggedIn();
            if (!isAdminLoggedIn) {
                navigate("/no-access");
            }
            const authTime = window.localStorage.getItem("login_at");
            const anHourAgo = Date.now() - (1000 * 60 * 60);
            if (new Date(Number(authTime)) < new Date(anHourAgo)) {
                window.localStorage.clear();
            }
    }


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleDrawerOpen = () => {
      setOpen(!open);
    };
  
   
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (event, index,link) => {
        setSelectedIndex(index);
        navigate(`/admin/${link}`);

      };

    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed"  color="default" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 2,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} ><img src="/assets/images/DGSoft-logo.png" style={{width:'150px'}}/></Box>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="DG" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                    <MenuItem key={'profile'} >
                    Profile
                    </MenuItem>
                    <MenuItem key={'logout'} onClick={handleLogoutClick}>
                    Logout
                    </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
            </DrawerHeader>
            <Divider />
            <List>
              {menuList.map((item, index) => (
                <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                   selected={selectedIndex === index}
                   onClick={(event) => handleListItemClick(event,index,item.link)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
           {props.children}
          </Box>
        </Box>
      );
}
export default UserLayout;

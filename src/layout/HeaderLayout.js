import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = [
  {
    label: 'Home',
    key: "home",
    path:'/',
  },
  {
    label: 'Product',
    key: "products",
    path:'/products',
  },
  {
    label: 'Service',
    key: "services",
    path:'/services',
  },
  {
    label: 'AMC Plans',
    key: "amc-plans-details",
    path:'/amc-plans-details',

  },
  {
    label: 'About Us',
    key: "about-us",
    path:'/about-us',

  },
  {
    label: 'Contact Us',
    key: "contact-us",
    path:'/contact-us',

  },
  {
    label: 'Login',
    key: "login",
    path:'/login',

  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 

  return (
    <AppBar position="fixed" color='default'>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }} ><img src="/assets/images/DGSoft-logo.png" style={{width:'150px'}}/></Box>

          <Box sx={{ flexGrow: 1, display: { sm: 'flex', md: 'none' } , justifyContent:'flex-end'}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem LinkComponent='a' key={page.key}>
                  <Link  href={page.path} underline='none' color="inherit">
                  {page.label}
                        </Link>
                
                </MenuItem>
              ))}
            </Menu>
          </Box>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , justifyContent:'flex-end'}}>
            {pages.map((page) => (
              <Button
                key={page.key}
                href={page.path}
                sx={{ my: 2, display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

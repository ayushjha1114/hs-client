import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Facebook,Twitter,Instagram,LinkedIn} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        DGSOFT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex',  backgroundColor: 'blue',
      backgroundImage: 'linear-gradient(#6c6cef, #9fbce7)'}}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={8}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              sx={{ height: 120 }}
            >
               <Grid item>
               <img src="/assets/images/DGSoft-footer.png" alt="" />
               </Grid>
             
              {/* <Grid item sx={{ display: 'flex' }} >
                <Copyright />
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0}}>
              <Box component="li" >
                <Link underline='none' href="/about-us"><Typography sx={{color:'white'}} variant="h6" marked="left" >
                About Us
            </Typography></Link>
              </Box>
              <Box component="li" >
                <Link underline='none' href="/contact-us"><Typography sx={{color:'white'}} variant="h6" marked="left" >
                Contact Us
            </Typography></Link>
              </Box>
              <Box component="li" >
                <Link underline='none' href="/services"><Typography sx={{color:'white'}} variant="h6" marked="left" >
               Services
            </Typography></Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0}}>
              <Box component="li" >
                <Link underline='none' href="/#"><Typography sx={{color:'white'}} variant="h6" marked="left" >
                Terms and Conditions
            </Typography></Link>
              </Box>
              <Box component="li" >
                <Link underline='none' href="/#"><Typography sx={{color:'white'}} variant="h6" marked="left" >
                Privacy Policy
            </Typography></Link>
              </Box>
              <Box component="li" >
                <Link underline='none' href="/#"><Typography sx={{color:'white'}} variant="h6" marked="left" >
                Cookie Policy
            </Typography></Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={4} md={3}>
            <Typography sx={{color:'white'}} variant="h6" marked="left">
            Let's chat! help.support@dgsoft.net
            </Typography>
            <Box sx={{ display: 'flex' }}>
            <IconButton aria-label="delete">
              <Facebook/>
            </IconButton>
            <IconButton aria-label="delete">
              <Twitter/>
            </IconButton>
            <IconButton aria-label="delete">
              <Instagram/>
            </IconButton>
            <IconButton aria-label="delete">
              <LinkedIn/>
            </IconButton>
             
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}

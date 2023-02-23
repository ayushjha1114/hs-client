import React from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

const AuthLayout = (props) => {
	return (
		<Grid container>
			{props.children}
	 	</Grid>
	)

}

export default AuthLayout;
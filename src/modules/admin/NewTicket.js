import React, { useEffect, useState } from 'react';
import PropTypes, { element } from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {DialogContent,TextField,FormControlLabel,Autocomplete,Checkbox,Typography,Divider,Card,CardActions,CardContent,CardHeader} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm ,Controller,useFieldArray} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { notification } from "antd";
import { BoyOutlined } from '@mui/icons-material';
import UserLayout from '../../layout/User';


const NewTicket = (props) => {

  const {register,handleSubmit, control,reset,setValue,watch} = useForm();

  return (
    <>
    <UserLayout>
        <Card
          sx={{
            margin: '4% 0%',
            padding: '20px 10px',
            borderRadius: '8px',
            height: 'auto',
          }}
        >
          <CardHeader title={'New Ticket'}></CardHeader>
          <Divider />
          <CardContent>
          <Grid container sx={{padding:'2%'}} spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
              name='first_name'
              control={control}
              render ={({
                field: { onChange, value, name },
                fieldState: { error }
                
              }) => (
                <Autocomplete
                  disablePortal
                  id="userId"
                  options={[]}
                  size="small" fullWidth 
                  renderInput={(params) => <TextField {...params} label="Customer" />}
                />
              // <TextField id='firstName' 
              //  size="small" fullWidth 
              //  label='First Name'
              //  value={value}
              //  variant='outlined'
              //  error ={!!error}
              //  helperText = {error?.message}
              // onChange={onChange}
              // />
              )}
              rules={{ required:{value: true,message:"First Name is required."} }}
              />

            </Grid>
            </Grid>
          </CardContent>
            <Divider/>
            <CardActions>
              <Button variant="contained" style={{marginLeft:'auto'}} type='submit'>
              Save
              </Button>
    </CardActions>
        </Card>
      </UserLayout>
    </>
  )
};

export default NewTicket;
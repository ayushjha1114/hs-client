// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Divider from "@mui/material/Divider";
// import { FormControlLabel, Checkbox } from "@mui/material";
// import {
//   useCreateServiceMutation,
//   useGetAllServiceQuery,
//   useUpdateServiceDetailMutation,
// } from "../../services/admin";
// import { PlusCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
// // import { notification } from "antd";
// // import { Button, Modal } from 'antd';
// // import {
// //   Cascader,
// //   DatePicker,
// //   Form,
// //   Input,
// //   InputNumber,
// //   Radio,
// //   Select,
// //   Switch,
// //   TreeSelect,
// //   Checkbox,
// // } from 'antd';
// // import { Col, Divider, Row } from 'antd';


// // const { TextArea } = Input;
// const options = [
//   {
//     label: 'Online',
//     value: 'Online',
//   },
//   {
//     label: 'On-Site',
//     value: 'On-Site',
//   },
//   {
//     label: 'Pick & Drop',
//     value: 'Pick & Drop',
//   },
// ];
// export default function NewServiceModal(props) {
//   const { show, onHide, isEdit, closeEdit, serviceId } = props;
//   console.log('-----' + show);
//   const serviceList = useSelector((state) => state.admin.serviceList);
//   const { refetch } = useGetAllServiceQuery();
//   const [createService] = useCreateServiceMutation();
//   const [updateServiceDetail] = useUpdateServiceDetailMutation();

//   let [serviceProvided, setServiceProvided] = useState({
//     totalRows: 1,
//     rows: [1],
//     serviceProvidedData: [],
//   });
//   const [data, setData] = useState({});
//   const [serviceType, setServiceType] = useState([]);
//   let [defaultServiceProvided, setDefaultServiceProvided] = useState([]);

//   const [serviceProvidedLabel, setServiceProvidedLabel] = useState("");
//   const [serviceProvidedDescription, setServiceProvidedDescription] =
//     useState("");
//   const [defaultData, setDefaultData] = useState({});

//   const [defaultOnSite, setDefaultOnSite] = useState(false);
//   const [defaultOnline, setDefaultOnline] = useState(false);
//   const [defaultPickDrop, setDefaultPickDrop] = useState(false);
//   const [defaultOnSiteChecked, setDefaultOnSiteChecked] = useState(false);
//   const [defaultOnlineChecked, setDefaultOnlineChecked] = useState(false);
//   const [defaultPickDropChecked, setDefaultPickDropChecked] = useState(false);

//   let errorHandler = (message, description) => {
//     setTimeout(() => {
//       notification.error({
//         message,
//         description,
//         duration: 8,
//         className: "notification-error",
//       });
//     }, 50);
//   };

//   const handleCancel = () => {
//     setDefaultOnline(false);
//     setDefaultOnSite(false);
//     setDefaultPickDrop(false);
//     setServiceProvided({ totalRows: 1, rows: [1], serviceProvidedData: [] });
//     setServiceProvidedLabel("");
//     setServiceProvidedDescription("");
//     onHide();
//     e.stopPropagation();

//     setShowModal(!showModal);
//     closeEdit();
//   };

//   useEffect(() => {
//     if (serviceList && serviceList.length > 0 && isEdit) {
//       serviceList.map((item) => {
//         if (item.id === serviceId) {
//           let serviceProvidedLength = item?.service_provided?.length;
//           let newArr = [];
//           let i = 0;
//           while (i !== serviceProvidedLength) {
//             newArr.push(i + 1);
//             i++;
//           }
//           item.service_type.map((element) => {
//             if (element === "ONLINE") {
//               setDefaultOnline(true);
//             } else if (element === "ON-SITE") {
//               setDefaultOnSite(true);
//             } else if (element === "PICK AND DROP") {
//               setDefaultPickDrop(true);
//             }
//           });

//           setDefaultServiceProvided(item.service_provided);
//           setServiceProvided({
//             totalRows: serviceProvidedLength,
//             rows: newArr,
//             serviceProvidedData: item.service_provided,
//           });
//           setServiceProvidedLabel(
//             item.service_provided[serviceProvidedLength - 1].label
//           );
//           setServiceProvidedDescription(
//             item.service_provided[serviceProvidedLength - 1].description
//           );
//           setServiceType(item.service_type);
//           setDefaultData(item);
//         }
//       });
//     }
//   }, [isEdit, show]);

//   const handleChange = (event, field) => {
//     switch (field) {
//       case "name":
//         setData({ ...data, name: event.target.value });
//         break;
//       case "description":
//         setData({ ...data, description: event.target.value });
//         break;
//       case "label":
//         setServiceProvidedLabel(event.target.value);
//         break;
//       case "service_provided_description":
//         setServiceProvidedDescription(event.target.value);
//         break;
//       default:
//         console.log("nothing");
//     }
//   };

//   const handleAddBtn = (count) => {
//     if (!serviceProvidedLabel) {
//       errorHandler(
//         "Error occurred",
//         "Please enter the service provided label."
//       );
//     } else if (!serviceProvidedDescription) {
//       errorHandler(
//         "Error occurred",
//         "Please enter the service provided description."
//       );
//     } else {
//       const totalCount = serviceProvided.totalRows;
//       if (isEdit) {
//         let modifiedData = defaultServiceProvided
//           .map((item) => {
//             if (item.label !== serviceProvidedLabel) {
//               return item;
//             }
//           })
//           .filter((ele) => ele);
//         setServiceProvided({
//           totalRows: totalCount + 1,
//           rows: [...serviceProvided.rows, totalCount + 1],
//           serviceProvidedData: [
//             ...modifiedData,
//             {
//               label: serviceProvidedLabel,
//               description: serviceProvidedDescription,
//             },
//           ],
//         });
//         setDefaultServiceProvided([
//           ...modifiedData,
//           {
//             label: serviceProvidedLabel,
//             description: serviceProvidedDescription,
//           },
//         ]);
//       } else {
//         setServiceProvided({
//           totalRows: totalCount + 1,
//           rows: [...serviceProvided.rows, totalCount + 1],
//           serviceProvidedData: [
//             ...serviceProvided.serviceProvidedData,
//             {
//               label: serviceProvidedLabel,
//               description: serviceProvidedDescription,
//             },
//           ],
//         });
//       }
//       setServiceProvidedLabel("");
//       setServiceProvidedDescription("");
//     }
//   };

//   const handleServiceType = (event, value) => {
//     if (value === "ONLINE") {
//       setDefaultOnlineChecked(!defaultOnlineChecked);
//       setDefaultOnline(!defaultOnline);
//     } else if (value === "ON-SITE") {
//       setDefaultOnSiteChecked(!defaultOnSiteChecked);
//       setDefaultOnSite(!defaultOnSite);
//     } else if (value === "PICK AND DROP") {
//       setDefaultPickDropChecked(!defaultPickDropChecked);
//       setDefaultPickDrop(!defaultPickDrop);
//     }
//     if (event.target.checked) {
//       setServiceType([...serviceType, value]);
//     } else {
//       const modifiedType = serviceType
//         .map((item) => {
//           if (item !== value) {
//             return item;
//           }
//         })
//         .filter((item) => item);
//       setServiceType(modifiedType);
//     }
//   };

//   const handleSubmit = async () => {
//     if (isEdit) {
//       let serviceData = {};
//       serviceData.name = data.name;
//       serviceData.description = data.description;
//       if (serviceType.length > 0) {
//         serviceData.service_type = JSON.stringify(serviceType);
//       }
//       if (serviceProvided.serviceProvidedData.length > 0) {
//         serviceData.service_provided = serviceProvided.serviceProvidedData;
//       }
//       const response = await updateServiceDetail({
//         ...serviceData,
//         id: serviceId,
//       });
//       if (response?.data?.success) {
//         notification.success({
//           message: "Success",
//           description: "Service Update Successfully !!",
//           duration: 4,
//           className: "notification-green",
//         });
//         setServiceType([]);
//         refetch();
//         onHide();
//       } else {
//         errorHandler(
//           "Technical Error",
//           "There may be some error occurred while processing the request. Please try after some time."
//         );
//       }
//     } else {
//       if (!data.name) {
//         errorHandler("Error occurred", "Please enter the service name.");
//       } else if (!data.description) {
//         errorHandler("Error occurred", "Please enter the service description.");
//       } else if (serviceType.length === 0) {
//         errorHandler("Error occurred", "Please select the service type.");
//       } else {
//         let serviceData = {};
//         serviceData.name = data.name;
//         serviceData.description = data.description;
//         serviceData.service_type = JSON.stringify(serviceType);
//         serviceData.service_provided = serviceProvided.serviceProvidedData;

//         const response = await createService(serviceData);

//         if (response?.data?.success) {
//           notification.success({
//             message: "Success",
//             description: "Service Created Successfully !!",
//             duration: 4,
//             className: "notification-green",
//           });
//           refetch();
//           onHide();
//         } else {
//           errorHandler(
//             "Technical Error",
//             "There may be some error occurred while processing the request. Please try after some time."
//           );
//         }
//       }
//     }
//   };

//   const handleRemoveServiceProvided = (index) => {
//     const indexedValue = serviceProvided.serviceProvidedData[index - 1];
//     const newArr = serviceProvided.serviceProvidedData
//       .map((item) => {
//         if (item.label !== indexedValue.label) {
//            document.getElementById(`label ${item.label}`).value = 'dsdfsdf lund';
//            console.log("🚀 ~ file: NewServiceModal.js:286 ~ .map ~ document.getElementById(`label ${item.label}`)", document.getElementById(`label ${item.label}`))
//           return item;
//         }
//       })
//       .filter((item) => item);
//     serviceProvided.rows.pop();
//     setServiceProvided({
//       totalRows: serviceProvided.totalRows - 1,
//       rows: serviceProvided.rows,
//       serviceProvidedData: newArr,
//     });
//   };

//   const onChange = (checkedValues) => {
//     console.log('checked = ', checkedValues);
//   };

//   return (
//     <>
//      <div>
//        <Dialog open={show} onClose={handleCancel} maxWidth="lg" fullWidth={true}>
//          <DialogTitle className="registerModalTitle">
//            {isEdit ? "Edit Service" : "Create Service"}
//          </DialogTitle>
//          <DialogContent>
//            <DialogContentText className="registerModalContentText">
//              Service Information
//            </DialogContentText>
//            <Divider />
//            <div className="registerModalBody">
//              <div className="registerModalBodyField">
//                <TextField
//                  required
//                  autoFocus
//                  margin="dense"
//                  id="name"
//                  label="Name"
//                  type="text"
//                  fullWidth
//                  variant="standard"
//                  defaultValue={isEdit ? defaultData?.name : ""}
//                  onChange={(e) => handleChange(e, "name")}
//                />
//              </div>
//              <div className="registerModalBodyField">
//                <DialogContentText className="serviceModalServiceTypeText">
//                  Service Type:
//                </DialogContentText>
//                <FormControlLabel
//                  control={
//                    isEdit ? (
//                      <Checkbox
//                         checked={defaultOnSite || defaultOnSiteChecked}
//                        checked={defaultOnSite}
//                        onChange={(e) => handleServiceType(e, "ON-SITE")}
//                      />
//                    ) : (
//                      <Checkbox
//                         checked={defaultOnSite}
//                        onChange={(e) => handleServiceType(e, "ON-SITE")}
//                      />
//                    )
//                  }
//                  label="ON-SITE"
//                />
//                <FormControlLabel
//                  control={
//                    isEdit ? (
//                      <Checkbox
//                         checked={defaultOnline || defaultOnlineChecked}
//                        checked={defaultOnline}
//                        onChange={(e) => handleServiceType(e, "ONLINE")}
//                      />
//                    ) : (
//                      <Checkbox
//                         checked={(!isEdit && defaultOnline) || (isEdit && defaultOnlineChecked)}
//                        onChange={(e) => handleServiceType(e, "ONLINE")}
//                      />
//                    )
//                  }
//                  label="ONLINE"
//                />
//                <FormControlLabel
//                  control={
//                    isEdit ? (
//                      <Checkbox
//                         checked={defaultPickDrop || defaultPickDropChecked}
//                        checked={defaultPickDrop}
//                        onChange={(e) => handleServiceType(e, "PICK AND DROP")}
//                      />
//                    ) : (
//                      <Checkbox
//                         checked={defaultPickDrop || (isEdit && defaultPickDropChecked)}
//                        onChange={(e) => handleServiceType(e, "PICK AND DROP")}
//                      />
//                    )
//                  }
//                  label="PICK AND DROP"
//                />
//              </div>
//              <div className="registerModalBodyField">
//                <TextField
//                  id="standard-textarea"
//                  label="Description"
//                  placeholder="Enter the description"
//                  multiline
//                  maxRows={4}
//                  variant="standard"
//                  fullWidth
//                  onChange={(e) => handleChange(e, "description")}
//                  defaultValue={isEdit ? defaultData?.description : ""}
//                />
//              </div>
//              {serviceProvided.rows.map((item, key) => (
//                <div className="registerModalBodyField">
//                  <DialogContentText className="serviceModalServiceProvidedText">
//                    Service Provide:
//                  </DialogContentText>
//                  <TextField
//                    required
//                    margin="dense"
//                     // id={`label ${defaultData?.service_provided[key]?.label}`}
//                    label="Label"
//                    type="text"
//                    fullWidth
//                    variant="standard"
//                    InputLabelProps={{
//                      shrink: true,
//                    }}
//                    defaultValue={
//                      isEdit
//                        ? defaultData?.service_provided
//                          ? defaultData?.service_provided[key]?.label
//                          : ""
//                        : ""
//                    }
//                    onChange={(e) => handleChange(e, "label")}
//                  />
//                  <TextField
//                    margin="dense"
//                    id="name"
//                    label="Description"
//                    type="text"
//                    fullWidth
//                    variant="standard"
//                    InputLabelProps={{
//                      shrink: true,
//                    }}
//                    defaultValue={
//                      isEdit
//                        ? defaultData?.service_provided
//                          ? defaultData?.service_provided[key]?.description
//                          : ""
//                        : ""
//                    }
//                    onChange={(e) =>
//                      handleChange(e, "service_provided_description")
//                    }
//                  />

//                  {serviceProvided.totalRows !== item && (
//                    <a
//                      className="serviceModalAddBtn"
//                      onClick={() => handleRemoveServiceProvided(item)}
//                    >
//                      <CloseCircleTwoTone />
//                    </a>
//                  )}
//                  {serviceProvided.totalRows === item && (
//                    <a
//                      className="serviceModalAddBtn"
//                      onClick={() => handleAddBtn(item)}
//                    >
//                      <PlusCircleTwoTone />
//                    </a>
//                  )}
//                </div>
//              ))}
//            </div>
//          </DialogContent>
//          <DialogActions>
//            <Button className="registerModalBtn" onClick={() => handleCancel()}>
//              Cancel
//            </Button>
//            <Button className="registerModalBtn" onClick={() => handleSubmit()}>
//              {isEdit ? "Save" : "Create"}
//            </Button>
//          </DialogActions>
//        </Dialog>
//      </div>
//      </>
//   );
// }
import React, { useEffect, useState } from 'react';
import PropTypes, { element } from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {DialogContent,TextField,FormControlLabel,Checkbox,Typography,Divider} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm ,Controller,useFieldArray} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  useCreateServiceMutation,
  useUpdateServiceDetailMutation,
  useGetServiceByIdQuery,
} from "../../services/admin";
import { notification } from "antd";
import { BoyOutlined } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function NewServiceModal(props) {
  const { show, onHide, isEdit, closeEdit, serviceId } = props;
  const [serviceDetail,setServiceDetail] = React.useState({});
  const [createService] = useCreateServiceMutation();
  const [updateServiceDetail] = useUpdateServiceDetailMutation();
  const {handleSubmit, control,setValue} = useForm({
    defaultValues: {
      name:'',
      description:'',
      service_provided: [{
        name:'',
        description:'',
      }]
    },
    values: serviceDetail
  });
  const { data, error, isLoading } = useGetServiceByIdQuery(serviceId);
  console.log(data);
  const serviceTypes=[{name:'ON-SITE',value:'ON-SITE'},
  {name:'ONLINE',value:'ONLINE'},
  {name:'PICK & DROP',value:'PICK & DROP'}];

  const onSubmit = async(data) => {
    console.log(data);
    let response,message;
    data.service_type = JSON.stringify(data.service_type||['test']);
    if(isEdit) {
      response = await updateServiceDetail(
        data
      );
      message = "Service Update Successfully !!";
    } else {
      
      response = await createService(data);
      message = "Service Created Successfully !!";
    }
        if (response?.data?.success) {
          notification.success({
            message: "Success",
            description: message,
            duration: 4,
            className: "notification-green",
          });
         
          onHide();
        } else {
          errorHandler(
            "Technical Error",
            "There may be some error occurred while processing the request. Please try after some time."
          );
        }
      };


  const { fields, append, remove } = useFieldArray({
    control,
    name: "service_provided",
  });
    let errorHandler = (message, description) => {
    setTimeout(() => {
      notification.error({
        message,
        description,
        duration: 8,
        className: "notification-error",
      });
    }, 50);
  };

  useEffect(() => {
      if(isEdit && !isLoading && data?.data?.serviceDetail){
        setServiceDetail(data?.data?.serviceDetail);
      }
 
  }, [isLoading,data]);

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={show}
        scroll='body'
        maxWidth='lg'
        fullWidth
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onHide}>
          Create Service
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit )}>
        <DialogContent dividers>
         <Grid container  spacing={2}>
            <Grid item xs={12} sm={12}>
              <Controller
              name='name'
              control={control}
              render ={({
                field: { onChange, value, name },
                fieldState: { error }
                
              }) => (
              <TextField id='name' 
               size="small" fullWidth 
               label='Service Name'
               value={value}
               variant='outlined'
               error ={!!error}
               helperText = {error?.message}
              onChange={onChange}
              />
              )}
              rules={{ required:{value: true,message:"Service Name is required."} }}
              />

            </Grid>
            <Grid item xs={12} sm={12}>
            <Controller
              name='description'
              control={control}
              rules={{ required:{value: true,message:"Service Description is required."} }}
              render ={({
                field: { onChange,value },  fieldState: { error }
              }) => (
            <TextField size='small' fullWidth
          id="description"
          label="Service Description"
          multiline
          error={!!error}
              helperText = {error?.message}
          rows={2}
          value={value}
          onChange={onChange}
        />)} />
              </Grid>
            </Grid>
            <Divider sx={{paddingTop:'1%'}} >
            <Typography variant="h6" display="block" gutterBottom>
        Service Provides
      </Typography>
      </Divider>
        {fields.map(({id},index) => (
          <Grid container sx={{paddingTop:'1%'}} spacing={2} key={id}>
            <Grid item xs={3} sm={3}>
              <Controller
              name={`service_provided[${index}].name`}
              control={control}
              render ={({
                field,fieldState: { error }
                
              }) => (
              <TextField  
               size="small" fullWidth 
               label='Name'
               {...field}
               variant='outlined'
               error ={!!error}
               helperText = {error?.message}
              />
              )}
              rules={{ required:{value: true,message:"Service Provides Name is required."} }}
              />

            </Grid>
            <Grid item xs={4} sm={4}>
              <Controller
              name={`service_provided[${index}].description`}
              control={control}
              render ={({
                field,fieldState: { error }
              }) => (
              <TextField 
               size="small" fullWidth 
               label='Description'
               {...field}
               variant='outlined'
               error ={!!error}
               helperText = {error?.message}
              />
              )}
              rules={{ required:{value: true,message:"Service Provides Description is required."} }}
              />

            </Grid>
            <Grid item xs={4} sm={4}>
            {serviceTypes.map((element,i)=>(
            <Controller
              name={`service_provided[${index}].serviceType.${element.value}`}
              control={control}
              defaultValue = {false}
              render ={({
                field
              }) => (
                  <FormControlLabel {...field} control={<Checkbox  checked={field.value}/>} label={element.name} />
              )}
              />
            ))}
            
            </Grid>
            <Grid item xs={1} sm={1}> 
            {fields.length !== 1 ? <IconButton aria-label="delete" color ='error' onClick={()=> remove(index)} size="small">
              <DeleteIcon />
            </IconButton> : ''}
            {fields.length === index+1 ? <IconButton aria-label="add" color='primary' onClick={()=> append({name:'',description:'',serviceType:''})} size="small">
              <AddCircleIcon />
            </IconButton>: ''} </Grid>
            </Grid>

        ))}
        </DialogContent>
        <DialogActions>
        <Button autoFocus variant="contained" type='submit'>
              Save
              </Button>
        </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
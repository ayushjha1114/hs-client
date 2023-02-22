import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { AES } from "crypto-js";
import {
  useGetAllUserQuery,
  useRegisterUserMutation,
  useUpdateUserDetailMutation,
  useGetUserByIdQuery,
} from "../../services/admin";
import config from "../../config/server";
import { notification } from "antd";
import UserLayout from "../../layout/User";
import moment from "moment";
import { devices } from "../../config/constant";
import {
  Card,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  OutlinedInput,
  CardHeader,
  InputAdornment,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  CardActions,
  CardContent,
  Paper,
} from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailIcon from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useForm, Controller } from "react-hook-form";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";

const baseConfig = config[config.serviceServerName["auth"]];

const RegisterUser = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const defaultUserData = useSelector((state) => state.admin.defaultUserData);

  const [registerUser] = useRegisterUserMutation();
  const [updateUserDetail] = useUpdateUserDetailMutation();
  const { refetch } = useGetAllUserQuery({ limit: 10, offset: 0 });

  const [isChecked, setIsChecked] = useState(false);
  // const [data, setData] = useState({});
  const [permanentAddress, setPermanentAddress] = useState("");
  const [isCurrentSame, setIsCurrentSame] = useState(false);
  const [permanentState, setPermanentState] = useState("");
  const [prefillValue, setPrefillValue] = useState({});
  const [userTypeAMC, setUserTypeAMC] = useState(false);
  const [forEdit, setForEdit] = useState(location?.state?.forEdit);
  const [device, setDevice] = React.useState([]);
  const [mobile, setMobile] = useState(location?.state?.mobile);
  const [id, setId] = useState(location?.state?.id);
  const [AMCData, setAMCData] = useState({});
  const currentDate = moment().format("YYYY-MM-DD");

  //New Features
  const { data, error, isLoading } = useGetUserByIdQuery(id);
  console.log(data);
  const emailPattern =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const genderOption = [
    {
      label: "Male",
      value: "MALE",
    },
    {
      label: "Female",
      value: "FEMALE",
    },
    {
      label: "Other",
      value: "OTHER",
    },
  ];

  const UserType = [
    {
      label: "Admin",
      value: "ADMIN",
    },
    {
      label: "Customer",
      value: "USER",
    },
    {
      label: "AMC Customer",
      value: "AMC",
    },
    {
      label: "Engineer",
      value: "ENGINEER",
    },
  ];
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [userType, setUserType] = React.useState("");
  const [user, setUser] = React.useState({});

  const handleSelectChange = (event) => {
    setUserType(event.target.value);
  };

  const defaultValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    date_of_birth: "",
    director_email: "",
    date_of_registration: moment().format(),
    gender: "",
    img_url: "",
    role: "",
    aadhaar_number: "",
    gst_number: "",
    current_address: "",
    current_state: "",
    current_city: "",
    current_pincode: "",
    company_name: "",
    contact_person_name: "",
    contact_person_number: "",
    permanent_address: "",
    permanent_state: "",
    permanent_city: "",
    permanent_pincode: "",
    pan_number: "",
    admin_email: "",
    amcDetail: {
      device: [],
      plan_activation_date: moment().format(),
      plan_expired_date: moment().format(),
      user_plan: "",
    },
  };

  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues,
    values: user,
  });
  const onSubmit = async (data) => {
    console.log(data);
    if (forEdit) {
      let modifiedData = data;
      modifiedData.mobile = mobile;
      if (modifiedData?.amcDetail?.device)
        modifiedData.amcDetail.device = JSON.stringify(
          modifiedData.amcDetail?.device
        );
      dispatch(SET_LOADING({ data: true }));
      const response = await updateUserDetail(modifiedData);
      if (response?.data?.success) {
        dispatch(SET_LOADING({ data: false }));
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Update Successfully !",
            variant: "success",
          })
        );
        refetch();
        navigate("/admin/user-management");
      } else {
        dispatch(SET_LOADING({ data: false }));
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Technical Error",
            variant: "error",
          })
        );
      }
    } else {
      console.log(data);
      const encryptedPassword = AES.encrypt(
        data?.password,
        baseConfig.encryptionKey
      ).toString();
      data.password = encryptedPassword;
      let userData = {};
      userData.userDetail = data;
      if (data?.amcDetail?.device)
        data.amcDetail.device = JSON.stringify(data.amcDetail?.device);
      dispatch(SET_LOADING({ data: true }));
      const response = await registerUser(data);
      if (response?.data?.success) {
        dispatch(SET_LOADING({ data: false }));
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "User Registration Successfully !",
            variant: "success",
          })
        );
        refetch();
        navigate("/admin/user-management");
      } else {
        dispatch(SET_LOADING({ data: false }));
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Technical Error",
            variant: "error",
          })
        );
      }
    }
  };
  // useSelector((state) => state.admin.defaultUserData);
  const handleCheckBoxClicked = (event) => {
    if (event.target.checked) {
      setValue("permanent_address", watchUser.current_address);
      setValue("permanent_city", watchUser.current_city);
      setValue("permanent_state", watchUser.current_state);
      setValue("permanent_pincode", watchUser.current_pincode);
    } else {
      setValue("permanent_address", "");
      setValue("permanent_city", "");
      setValue("permanent_state", "");
      setValue("permanent_pincode", "");
    }
    setIsCurrentSame(event.target.checked);
  };

  useEffect(() => {
    // reset form with user data
    // console.log(defaultUserData);
    if (location.state) {
      setForEdit(location.state.forEdit);
      setMobile(location.state.mobile);
      setId(location.state.id);
    }
    if (data?.data?.userDetail) {
      let user = JSON.parse(JSON.stringify(data?.data?.userDetail));
      if (user?.amcDetail?.device)
        user.amcDetail.device = JSON.parse(
          data?.data?.userDetail.amcDetail.device
        );
      setUser(user);
    }
    // if(data?.data?.userDetail) {
    //   const detail = data.data.userDetail;
    //         if(detail?.amcDetail){
    //           detail.amcDetail.detail = JSON.parse(detail.amcDetail.device);
    //         }
    //         setPrefillValue(detail);
    //       }
    //   reset(JSON.parse(JSON.stringify(data?.data?.rows?.userDetail)));
    // }
    // reset(JSON.parse(JSON.stringify({first_name:'Jitendra'})));
  }, [location?.state?.forEdit, location?.state?.id, data]);
  const watchUserType = watch("role");
  const watchUser = watch();
  console.log(watchUser);
  return (
    <>
      <UserLayout>
        <Card
          sx={{
            margin: "4% 0%",
            padding: "20px 10px",
            borderRadius: "8px",
            height: "auto",
          }}
        >
          <CardHeader
            title={forEdit ? "Edit User" : "Register User"}
          ></CardHeader>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <fieldset
                style={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}
              >
                <legend style={{ width: "fit-content", textAlign: "center" }}>
                  Personal Information
                </legend>
                <Grid container sx={{ padding: "2%" }} spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="first_name"
                      control={control}
                      render={({
                        field: { onChange, value, name },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="firstName"
                          size="small"
                          fullWidth
                          label="First Name"
                          value={value}
                          variant="outlined"
                          error={!!error}
                          helperText={error?.message}
                          onChange={onChange}
                        />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "First Name is required.",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="middle_name"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="middleName"
                          onChange={onChange}
                          value={value}
                          size="small"
                          fullWidth
                          label="Middle Name"
                          variant="outlined"
                        />
                      )}
                    />{" "}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="last_name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Last Name is required.",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="lastname"
                          error={!!error}
                          helperText={error?.message}
                          value={value}
                          onChange={onChange}
                          size="small"
                          fullWidth
                          label="Last Name"
                          variant="outlined"
                        />
                      )}
                    />{" "}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Email is required.",
                        },
                        pattern: {
                          value: emailPattern,
                          message: "Email Id is not valid.",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="email"
                          onChange={onChange}
                          value={value}
                          error={!!error}
                          helperText={error?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon />
                              </InputAdornment>
                            ),
                          }}
                          type="text"
                          size="small"
                          fullWidth
                          label="Email Address"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="mobile"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Mobile Number is required.",
                        },
                        maxLength: {
                          value: 10,
                          message: "Mobile Number should be length of 10",
                        },
                        minLength: {
                          value: 10,
                          message: "Mobile Number should be length of 10",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="mobileNumber"
                          onChange={onChange}
                          value={value}
                          error={!!error}
                          helperText={error?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIphoneIcon />
                              </InputAdornment>
                            ),
                          }}
                          type="number"
                          size="small"
                          fullWidth
                          label="Mobile Number"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="date_of_birth"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Date Of Birth is required.",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="dob"
                          value={moment(value).format("YYYY-MM-DD")}
                          label="Date Of Birth"
                          type="date"
                          size="small"
                          fullWidth
                          format="dd-mm-yyyy"
                          onChange={onChange}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: !forEdit,
                          message: "Password is required.",
                        },
                        maxLength: {
                          value: 18,
                          message:
                            "Please enter valid password of maximum 18 characters in length.",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "Please enter valid password of minimum 6 characters in length.",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControl
                          fullWidth
                          size="small"
                          error={!!error}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="aadhaar_number"
                      control={control}
                      rules={{
                        maxLength: {
                          value: 12,
                          message: "Please enter valid aadhaar number.",
                        },
                        minLength: {
                          value: 12,
                          message: "Please enter valid aadhaar number.",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="aadhaar_number"
                          onChange={onChange}
                          value={value}
                          error={!!error}
                          helperText={error?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FingerprintIcon />
                              </InputAdornment>
                            ),
                          }}
                          type="number"
                          size="small"
                          fullWidth
                          label="Aadhaar Number"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="role"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "User Type is required.",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControl size="small" fullWidth error={!!error}>
                          <InputLabel id="demo-simple-select-label">
                            User Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="userType"
                            onChange={onChange}
                            error={!!error}
                          >
                            {UserType.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Gender is required.",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControl error={!!error}>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            Gender
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={onChange}
                            value={value}
                            error={!!error}
                            helperText={error?.message}
                          >
                            {genderOption.map((option) => (
                              <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
              </fieldset>
              {watchUserType &&
              watchUserType !== "ADMIN" &&
              watchUserType !== "ENGINEER" ? (
                <fieldset
                  style={{
                    border: "1px solid #e0e0e0",
                    marginTop: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <legend style={{ width: "fit-content", textAlign: "center" }}>
                    Company Information
                  </legend>
                  <Grid container sx={{ padding: "2%" }} spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="company_name"
                        control={control}
                        rules={{
                          required: {
                            value: watchUserType === "AMC",
                            message: "Company Name is required.",
                          },
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            id="company_name"
                            error={!!error}
                            helperText={error?.message}
                            onChange={onChange}
                            size="small"
                            value={value}
                            fullWidth
                            label="Company Name"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="director_email"
                        control={control}
                        rules={{
                          pattern: {
                            value: emailPattern,
                            message: "Email Id is not valid.",
                          },
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            id="director_email"
                            onChange={onChange}
                            value={value}
                            error={!!error}
                            helperText={error?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MailIcon />
                                </InputAdornment>
                              ),
                            }}
                            type="email"
                            size="small"
                            fullWidth
                            label="Director Email Address"
                            variant="outlined"
                          />
                        )}
                      />{" "}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="admin_email"
                        control={control}
                        rules={{
                          pattern: {
                            value: emailPattern,
                            message: "Email Id is not valid.",
                          },
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            id="admin_email"
                            onChange={onChange}
                            value={value}
                            error={!!error}
                            helperText={error?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MailIcon />
                                </InputAdornment>
                              ),
                            }}
                            type="email"
                            size="small"
                            fullWidth
                            label="Admin Email Address"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="gst_number"
                        control={control}
                        rules={{
                          required: {
                            value: watchUserType === "AMC",
                            message: "GST Number is required.",
                          },
                          maxLength: {
                            value: 15,
                            message: "Please enter valid GST Number.",
                          },
                          minLength: {
                            value: 15,
                            message: "Please enter valid GST Number.",
                          },
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            id="gst_number"
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            size="small"
                            fullWidth
                            label="GST Number"
                            variant="outlined"
                          />
                        )}
                      />{" "}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="pan_number"
                        control={control}
                        rules={{
                          required: {
                            value: watchUserType === "AMC",
                            message: "PAN Number is required.",
                          },
                          maxLength: {
                            value: 10,
                            message: "Please enter valid GST Number.",
                          },
                          minLength: {
                            value: 10,
                            message: "Please enter valid PAN Number.",
                          },
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            id="pan_number"
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            size="small"
                            fullWidth
                            label="PAN Number"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="date_of_registration"
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            id="registration"
                            label="Date Of Registration"
                            type="date"
                            size="small"
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            onChange={onChange}
                            value={
                              value
                                ? moment(value).format("YYYY-MM-DD")
                                : moment().format()
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="contact_person_name"
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            id="contact_person_name"
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            size="small"
                            fullWidth
                            label="Contact Person Name"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="contact_person_number"
                        rules={{
                          maxLength: {
                            value: 10,
                            message: "Mobile Number should be length of 10",
                          },
                          minLength: {
                            value: 10,
                            message: "Mobile Number should be length of 10",
                          },
                        }}
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            id="contact_person_number"
                            onChange={onChange}
                            value={value}
                            error={!!error}
                            helperText={error?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIphoneIcon />
                                </InputAdornment>
                              ),
                            }}
                            type="number"
                            size="small"
                            fullWidth
                            label="Contact Person Number"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  {watchUserType === "AMC" ? (
                    <Grid container spacing={2} sx={{ padding: "2%" }}>
                      <Grid item xs={12} sm={4}>
                        <Controller
                          name="amcDetail.user_plan"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: "User Plan is required.",
                            },
                          }}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <TextField
                              id="user_plan"
                              value={value}
                              error={!!error}
                              helperText={error?.message}
                              onChange={onChange}
                              size="small"
                              fullWidth
                              label="Customer Plan"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Controller
                          name="amcDetail.plan_activation_date"
                          rules={{
                            required: {
                              value: true,
                              message: "Plan Activation Date is required.",
                            },
                          }}
                          control={control}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <TextField
                              id="activationDate"
                              value={moment(value).format("YYYY-MM-DD")}
                              label="Plan Activation Date"
                              type="date"
                              size="small"
                              fullWidth
                              error={!!error}
                              helperText={error?.message}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={onChange}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Controller
                          name="amcDetail.plan_expired_date"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: "Plan Expired Date is required.",
                            },
                          }}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <TextField
                              id="expireDate"
                              label="Plan Expired Date"
                              type="date"
                              error={!!error}
                              helperText={error?.message}
                              fullWidth
                              value={moment(value).format("YYYY-MM-DD")}
                              size="small"
                              onChange={onChange}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Controller
                          name="amcDetail.device"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: "Device is required.",
                            },
                          }}
                          defaultValue={[]}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <FormControl size="small" fullWidth>
                              <InputLabel id="demo-multiple-name-label">
                                Device
                              </InputLabel>
                              <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={value ? value : []}
                                error={!!error}
                                helperText={error?.message}
                                onChange={onChange}
                                input={<OutlinedInput label="Device" />}
                              >
                                {devices.map((device) => (
                                  <MenuItem key={device} value={device}>
                                    {device}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </fieldset>
              ) : (
                ""
              )}
              <fieldset
                style={{
                  border: "1px solid #e0e0e0",
                  marginTop: "20px",
                  borderRadius: "10px",
                }}
              >
                <legend style={{ width: "fit-content", textAlign: "center" }}>
                  Address Information
                </legend>
                <Grid container sx={{ padding: "2%" }} spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="current_address"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          size="small"
                          fullWidth
                          id="current_address"
                          label="Current Address"
                          multiline
                          error={!!error}
                          helperText={error?.message}
                          rows={2}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="current_city"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="current_city"
                          value={value}
                          onChange={onChange}
                          size="small"
                          fullWidth
                          label="Current City"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="current_state"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="current_state"
                          value={value}
                          onChange={onChange}
                          size="small"
                          fullWidth
                          label="Current State"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="current_pincode"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="current_pincode"
                          value={value}
                          onChange={onChange}
                          size="small"
                          fullWidth
                          label="Current Pincode"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleCheckBoxClicked}
                            checked={isCurrentSame}
                          />
                        }
                        label="Visit address same as Current address"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="permanent_address"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          size="small"
                          fullWidth
                          id="permanent_address"
                          label="Visit Address"
                          multiline
                          rows={2}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="permanent_city"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="permanent_city"
                          value={value}
                          onChange={onChange}
                          size="small"
                          fullWidth
                          label="Visit City"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="permanent_state"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="permanent_state"
                          value={value}
                          onChange={onChange}
                          size="small"
                          fullWidth
                          label="Visit State"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="permanent_pincode"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="permanent_pincode"
                          value={value}
                          onChange={onChange}
                          size="small"
                          fullWidth
                          label="Visit Pincode"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                variant="contained"
                style={{ marginLeft: "auto" }}
                type="submit"
              >
                Save
              </Button>
            </CardActions>
          </form>
        </Card>
      </UserLayout>
    </>
  );
};

export default RegisterUser;

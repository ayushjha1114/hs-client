import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AES } from "crypto-js";
import {
  useGetAllUserQuery,
  useRegisterUserMutation,
  useUpdateUserDetailMutation,
} from "../../services/admin";
import config from "../../config/server";
import { notification } from "antd";
import UserLayout from "../../layout/User";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { devices } from "../../config/constant";

const baseConfig = config[config.serviceServerName["auth"]];

const RegisterUser = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const defaultUserData = useSelector((state) => state.admin.defaultUserData);

  const [registerUser] = useRegisterUserMutation();
  const [updateUserDetail] = useUpdateUserDetailMutation();
  const { refetch } = useGetAllUserQuery({ limit: 10, offset: 0});

  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState({});
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [userTypeAMC, setUserTypeAMC] = useState(false);
  const [forEdit, setForEdit] = useState(false);
  const [device, setDevice] = React.useState([]);
  const [mobile, setMobile] = useState("");
  const [AMCData, setAMCData] = useState({});
  const currentDate = moment().format("YYYY-MM-DD");

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

  const handleChange = (event, field) => {
    switch (field) {
      case "first_name":
        setData({ ...data, first_name: event.target.value });
        break;
      case "middle_name":
        setData({ ...data, middle_name: event.target.value });
        break;
      case "last_name":
        setData({ ...data, last_name: event.target.value });
        break;
      case "email":
        setData({ ...data, email: event.target.value });
        break;
      case "password":
        setData({ ...data, password: event.target.value });
        break;
      case "mobile_number":
        setData({ ...data, mobile: event.target.value });
        break;
      case "dob":
        setData({ ...data, date_of_birth: event.target.value });
        break;
      case "gender":
        setData({ ...data, gender: event.target.value });
        break;
      case "aadhaar":
        setData({ ...data, aadhaar_number: event.target.value });
        break;
      case "role":
        setData({ ...data, role: event.target.value });
        if (event.target.value === "AMC") {
          setUserTypeAMC(true);
        } else {
          setUserTypeAMC(false);
        }
        break;
      case "current_address":
        setData({ ...data, current_address: event.target.value });
        break;
      case "current_city":
        setData({ ...data, current_city: event.target.value });
        break;
      case "current_state":
        setData({ ...data, current_state: event.target.value });
        break;
      case "current_pincode":
        setData({ ...data, current_pincode: event.target.value });
        break;
      case "permanent_address":
        setPermanentAddress(event.target.value);
        break;
      case "permanent_city":
        setPermanentCity(event.target.value);
        break;
      case "permanent_state":
        setPermanentState(event.target.value);
        break;
      case "permanent_pincode":
        setPermanentPincode(event.target.value);
        break;
      case "company_name":
        setAMCData({ ...AMCData, company_name: event.target.value });
        break;
      case "date_of_registration":
        setAMCData({ ...AMCData, date_of_registration: event.target.value });
        break;
      case "plan_activation_date":
        setAMCData({ ...AMCData, plan_activation_date: event.target.value });
        break;
      case "user_plan":
        setAMCData({ ...AMCData, user_plan: event.target.value });
        break;
      case "plan_expired_date":
        setAMCData({ ...AMCData, plan_expired_date: event.target.value });
        break;
      case "gst_number":
        setAMCData({ ...AMCData, gst_number: event.target.value });
        break;
      case "pan_number":
        setAMCData({ ...AMCData, pan_number: event.target.value });
        break;
      case "device":
        const {
          target: { value },
        } = event;
        setDevice(typeof value === "string" ? value.split(",") : value);
        break;
      case "director_email":
        setAMCData({ ...AMCData, director_email: event.target.value });
        break;
      case "admin_email":
        setAMCData({ ...AMCData, admin_email: event.target.value });
        break;
      default:
        console.log("nothing");
    }
  };

  const handleCheckBoxClicked = (event) => {
    if (event.target.checked) {
      setPermanentAddress(data?.current_address);
      setPermanentCity(data?.current_city);
      setPermanentState(data?.current_state);
      setPermanentPincode(data?.current_pincode);
    } else {
      setPermanentAddress('');
      setPermanentCity('');
      setPermanentState('');
      setPermanentPincode('');
    }
    setIsChecked((current) => !current);
  };

  const handleSubmit = async () => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (forEdit) {
      let modifiedData = data;
      modifiedData.mobile = mobile;
      const response = await updateUserDetail(modifiedData);
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: "Update Successfully !!",
          duration: 4,
          className: "notification-green",
        });
        refetch();
        navigate("/admin/user-management");
      } else {
        errorHandler(
          "Technical Error",
          "There may be some error occurred while processing the request. Please try after some time."
        );
      }
    } else {
      if (!data.first_name) {
        errorHandler("Error occurred", "Please enter your first name.");
      } else if (!data.email) {
        errorHandler("Error occurred", "Please enter the email.");
      } else if (!reg.test(data.email)) {
        errorHandler("Error occurred", "Please enter the valid email.");
      } else if (!data.password) {
        errorHandler("Error occurred", "Please enter the password.");
      } else if (data.password.length < 6) {
        errorHandler(
          "Error occurred",
          "Please enter valid password of minimum 6 characters in length."
        );
      } else if (!data.mobile) {
        errorHandler("Error occurred", "Please enter the mobile.");
      } else if (data.mobile.length !== 10) {
        errorHandler("Error occurred", "Please enter valid mobile number.");
      } else if (data.aadhaar_number && data.aadhaar_number?.length !== 12) {
        errorHandler("Error occurred", "Please enter valid aadhaar number.");
      } else {
          if (data.role === "AMC" && !AMCData.company_name) {
            errorHandler("Error occurred", "Please enter the company name.");
          } else if (data.role === "AMC" && !AMCData.plan_activation_date) {
            errorHandler(
              "Error occurred",
              "Please enter the plan activation date."
            );
          } else if (data.role === "AMC" && !AMCData.plan_expired_date) {
            errorHandler(
              "Error occurred",
              "Please enter the plan expired date."
            );
          } else if (data.role === "AMC" && device.length === 0) {
            errorHandler("Error occurred", "Please enter the device.");
          } else if (data.role === "AMC" && AMCData.pan_number && AMCData.pan_number?.length !== 10) {
            errorHandler("Error occurred", "Please enter valid pan number.");
          } else if (data.role === "AMC" && AMCData.gst_number && AMCData.gst_number?.length !== 15) {
            errorHandler("Error occurred", "Please enter valid gst number.");
          } else {

            data.permanent_address = permanentAddress;
            data.permanent_city = permanentCity;
            data.permanent_state = permanentState;
            data.permanent_pincode = permanentPincode;
            const encryptedPassword = AES.encrypt(
              data.password,
              baseConfig.encryptionKey
            ).toString();
            data.password = encryptedPassword;
            let userData = {};
            userData.userDetail = data;
            AMCData.device = JSON.stringify(device);
            if (!AMCData.date_of_registration) {
              AMCData.date_of_registration = currentDate;
            }
            userData.amcDetail = AMCData;
            const response = await registerUser(userData);
            if (response?.data?.success) {
              notification.success({
                message: "Success",
                description: "User Registration Successfully !!",
                duration: 4,
                className: "notification-green",
              });
              refetch();
              navigate("/admin/user-management");
            } else {
              errorHandler(
                "Technical Error",
                "There may be some error occurred while processing the request. Please try after some time."
              );
            }
          }
      }
    }
  };

  useEffect(() => {
    if (location.state) {
      setForEdit(location.state.forEdit);
      setMobile(location.state.mobile);
    }
  }, [location?.state?.forEdit]);

  return (
    <>
      <UserLayout>
        <div className="">
          <div className="register-user-card">
            <h3>{forEdit ? "Edit User" : "Register User"}</h3>
            <p>Personal Information</p>
            <Divider />
            <div className="registerModalBody">
              <div className="registerModalBodyField">
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={
                    location?.state?.forEdit ? defaultUserData?.first_name : ""
                  }
                  onChange={(e) => handleChange(e, "first_name")}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Middle Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={
                    forEdit
                      ? defaultUserData?.middle_name === "null"
                        ? ""
                        : defaultUserData?.middle_name
                      : ""
                  }
                  onChange={(e) => handleChange(e, "middle_name")}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={
                    location?.state?.forEdit
                      ? defaultUserData?.last_name === "null"
                        ? ""
                        : defaultUserData?.last_name
                      : ""
                  }
                  onChange={(e) => handleChange(e, "last_name")}
                />
              </div>
              <div className="registerModalBodyField">
                <TextField
                  disabled={forEdit}
                  required
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                  defaultValue={
                    location?.state?.forEdit ? defaultUserData?.email : ""
                  }
                  onChange={(e) => handleChange(e, "email")}
                />
                <TextField
                  required
                  disabled={forEdit}
                  margin="dense"
                  id="name"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "password")}
                />
              </div>
              <div
                className="registerModalBodyField"
                style={{ marginTop: "15px" }}
              >
                <TextField
                  required
                  disabled={forEdit}
                  margin="dense"
                  id="name"
                  label="Mobile Number"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={
                    location?.state?.forEdit ? defaultUserData?.mobile : ""
                  }
                  onChange={(e) => handleChange(e, "mobile_number")}
                />
                <TextField
                  id="date"
                  label="Date Of Birth"
                  type="date"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleChange(e, "dob")}
                  defaultValue={
                    location?.state?.forEdit
                      ? defaultUserData?.date_of_birth === "null"
                        ? "1997-05-24"
                        : moment(defaultUserData?.date_of_birth).format(
                            "YYYY-MM-DD"
                          )
                      : "1997-05-24"
                  }
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e) => handleChange(e, "gender")}
                    label="Gender"
                    defaultValue={
                      location?.state?.forEdit ? defaultUserData?.gender : ""
                    }
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div
                className="registerModalBodyField"
                style={{ marginTop: "15px" }}
              >
                <TextField
                  margin="dense"
                  id="name"
                  label="Aadhaar Number"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "aadhaar")}
                  defaultValue={
                    location?.state?.forEdit
                      ? defaultUserData?.aadhaar_number
                      : ""
                  }
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Customer Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e) => handleChange(e, "role")}
                    label="Customer Type"
                    defaultValue={
                      location?.state?.forEdit ? defaultUserData?.role : ""
                    }
                  >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="USER">USER</MenuItem>
                    <MenuItem value="AMC">AMC Customer</MenuItem>
                    <MenuItem value="ENGINEER">ENGINEER</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {(userTypeAMC ||
              (location?.state?.forEdit &&
                defaultUserData?.role === "AMC")) && (
              <>
                <p style={{ marginTop: "10px" }}>Company Information</p>
                <Divider />
                <div className="registerModalBody">
                  <div
                    className="registerModalBodyField"
                    style={{ marginTop: "15px" }}
                  >
                    <TextField
                      required
                      margin="dense"
                      id="name"
                      label="Company Name"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={
                        location?.state?.forEdit
                          ? defaultUserData?.company_name
                          : ""
                      }
                      onChange={(e) => handleChange(e, "company_name")}
                    />
                    <TextField
                      id="date"
                      label="Date of Registration"
                      type="date"
                      sx={{ width: 220 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleChange(e, "date_of_registration")}
                      defaultValue={
                        location?.state?.forEdit
                          ? moment(
                              defaultUserData?.date_of_registration
                            ).format("YYYY-MM-DD")
                          : currentDate
                      }
                    />
                    <TextField
                      id="date"
                      label="Plan Activation Date"
                      type="date"
                      sx={{ width: 220 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleChange(e, "plan_activation_date")}
                      defaultValue={
                        location?.state?.forEdit
                          ? moment(
                              defaultUserData?.plan_activation_date
                            ).format("YYYY-MM-DD")
                          : "1997-05-24"
                      }
                    />
                  </div>
                  <div
                    className="registerModalBodyField"
                    style={{ marginTop: "15px" }}
                  >
                    <TextField
                      margin="dense"
                      id="name"
                      label="User Plan"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={
                        location?.state?.forEdit
                          ? defaultUserData?.user_plan
                          : ""
                      }
                      onChange={(e) => handleChange(e, "user_plan")}
                    />
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Device
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={
                          location?.state?.forEdit
                            ? JSON.parse(defaultUserData?.device)
                            : device
                        }
                        onChange={(e) => handleChange(e, "device")}
                        input={<OutlinedInput label="Device" />}
                      >
                        {devices.map((device) => (
                          <MenuItem key={device} value={device}>
                            {device}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      id="date"
                      label="Plan Expired Date"
                      type="date"
                      sx={{ width: 220 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleChange(e, "plan_expired_date")}
                      defaultValue={
                        location?.state?.forEdit
                          ? moment(defaultUserData?.plan_expired_date).format(
                              "YYYY-MM-DD"
                            )
                          : "1997-05-24"
                      }
                    />
                  </div>
                  <div
                    className="registerModalBodyField"
                    style={{ marginTop: "15px" }}
                  >
                    <TextField
                      margin="dense"
                      id="name"
                      label="GST Number"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={
                        location?.state?.forEdit
                          ? defaultUserData?.gst_number
                          : ""
                      }
                      onChange={(e) => handleChange(e, "gst_number")}
                    />
                    <TextField
                      margin="dense"
                      id="name"
                      label="PAN Number"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={
                        location?.state?.forEdit
                          ? defaultUserData?.pan_number
                          : ""
                      }
                      onChange={(e) => handleChange(e, "pan_number")}
                    />
                  </div>
                  <div
                    className="registerModalBodyField"
                    style={{ marginTop: "15px" }}
                  >
                    <TextField
                      margin="dense"
                      id="name"
                      label="Director Email"
                      type="email"
                      fullWidth
                      variant="standard"
                      defaultValue={
                        location?.state?.forEdit
                          ? defaultUserData?.director_email
                          : ""
                      }
                      onChange={(e) => handleChange(e, "director_email")}
                    />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Admin Email"
                      type="email"
                      fullWidth
                      variant="standard"
                      defaultValue={
                        location?.state?.forEdit
                          ? defaultUserData?.admin_email
                          : ""
                      }
                      onChange={(e) => handleChange(e, "admin_email")}
                    />
                  </div>
                </div>
              </>
            )}
            <p style={{ marginTop: "10px" }}>Address Information</p>
            <Divider />
            <div className="registerModalBody">
              <TextField
                id="standard-textarea"
                label="Current Address"
                placeholder="Enter the current address"
                multiline
                maxRows={4}
                variant="standard"
                fullWidth
                onChange={(e) => handleChange(e, "current_address")}
                defaultValue={
                  location?.state?.forEdit
                    ? defaultUserData?.current_address
                    : ""
                }
              />
              <div className="registerModalBodyField">
                <TextField
                  margin="dense"
                  id="name"
                  label="Current City"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "current_city")}
                  defaultValue={
                    location?.state?.forEdit
                      ? defaultUserData?.current_city
                      : ""
                  }
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Current State"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "current_state")}
                  defaultValue={
                    location?.state?.forEdit
                      ? defaultUserData?.current_state
                      : ""
                  }
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Current Pincode"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "current_pincode")}
                  defaultValue={
                    location?.state?.forEdit
                      ? defaultUserData?.current_pincode
                      : ""
                  }
                />
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    value={isChecked}
                    onChange={(e) => handleCheckBoxClicked(e)}
                  />
                }
                label="Permanent address same as Current address"
              />
              <TextField
                id="standard-textarea"
                label="Permanent Address"
                placeholder="Enter the Permanent address"
                multiline
                maxRows={4}
                variant="standard"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleChange(e, "permanent_address")}
                defaultValue={
                  location?.state?.forEdit
                    ? defaultUserData?.permanent_address
                    : permanentAddress
                }
              />
              <div className="registerModalBodyField">
                <TextField
                  margin="dense"
                  id="Permanent City"
                  label="Permanent City"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "permanent_city")}
                  value={
                    location?.state?.forEdit
                      ? defaultUserData?.permanent_city
                      : permanentCity
                  }
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Permanent State"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "permanent_state")}
                  value={
                    location?.state?.forEdit
                      ? defaultUserData?.permanent_state
                      : permanentState
                  }
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Permanent Pincode"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "permanent_pincode")}
                  value={
                    location?.state?.forEdit
                      ? defaultUserData?.permanent_pincode
                      : permanentPincode
                  }
                />
              </div>
            </div>
            <Stack spacing={2} direction="row" className="register-btn-block">
              <Button variant="outlined" onClick={() => handleSubmit()}>
                SAVE
              </Button>
            </Stack>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default RegisterUser;

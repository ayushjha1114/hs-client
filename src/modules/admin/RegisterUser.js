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
import { AES } from "crypto-js";
import { ADD_USER } from "./adminSlice";
import {
  useGetAllUserQuery,
  useRegisterUserMutation,
  useUpdateUserDetailMutation,
} from "../../services/admin";
import config from "../../config/server";
import { notification } from "antd";
import UserLayout from "../../layout/User";
import Stack from "@mui/material/Stack";

const baseConfig = config[config.serviceServerName["auth"]];

const RegisterUser = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userList = useSelector((state) => state.admin.userList);

  const [registerUser] = useRegisterUserMutation();
  const [updateUserDetail] = useUpdateUserDetailMutation();
  const { refetch } = useGetAllUserQuery();

  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState({});
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [defaultData, setDefaultData] = useState({});
  const [userTypeAMC, setUserTypeAMC] = useState(false);
  const [forEdit, setForEdit] = useState(false);
  const [mobile, setMobile] = useState("");
  const [AMCData, setAMCData] = useState({});

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
        setAMCData({ ...AMCData, device: event.target.value });
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
      console.log(
        "🚀 ~ file: RegisterUserModal.js:135 ~ handleSubmit ~ data",
        data
      );
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
      } else if (data.aadhaar_number.length !== 12) {
        errorHandler("Error occurred", "Please enter valid aadhaar number.");
      } else if (data.role === "AMC") {
        if (!AMCData.date_of_registration) {
          errorHandler(
            "Error occurred",
            "Please enter the date of registration."
          );
        } else if (!AMCData.plan_activation_date) {
          errorHandler(
            "Error occurred",
            "Please enter the plan activation date."
          );
        } else if (!AMCData.user_plan) {
          errorHandler("Error occurred", "Please enter the user plan.");
        } else if (!AMCData.plan_expired_date) {
          errorHandler("Error occurred", "Please enter the plan expired date.");
        } else if (!AMCData.gst_number) {
          errorHandler("Error occurred", "Please enter the gst number.");
        } else if (!AMCData.pan_number) {
          errorHandler("Error occurred", "Please enter the pan number.");
        } else if (!AMCData.device) {
          errorHandler("Error occurred", "Please enter the device.");
        } else if (AMCData.pan_number.length !== 10) {
          errorHandler("Error occurred", "Please enter valid pan number.");
        } else if (AMCData.gst_number.length !== 15) {
          errorHandler("Error occurred", "Please enter valid gst number.");
        }
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
        userData.amcDetail = AMCData;
        console.log(
          "🚀 ~ file: RegisterUser.js:207 ~ handleSubmit ~ userData",
          userData
        );
        const response = await registerUser(userData);
        console.log(
          "🚀 ~ file: RegisterUserModal.js:180 ~ handleSubmit ~ response",
          response
        );
        if (response?.data?.success) {
          dispatch(ADD_USER({ data }));
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
  };

  useEffect(() => {
    if (location.state) {
      setForEdit(location.state.forEdit);
      setMobile(location.state.mobile);
    }
  }, [location.state]);

  useEffect(() => {
    if (userList.length > 0) {
      userList.map((item) => {
        if (item.mobile === mobile) {
          setDefaultData(item);
        }
      });
    }
  }, [forEdit]);

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
                  defaultValue={forEdit ? defaultData?.first_name : ""}
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
                      ? defaultData?.middle_name === "null"
                        ? ""
                        : defaultData?.middle_name
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
                    forEdit
                      ? defaultData?.last_name === "null"
                        ? ""
                        : defaultData?.last_name
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
                  defaultValue={forEdit ? defaultData?.email : ""}
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
                  defaultValue={forEdit ? defaultData?.mobile : ""}
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
                    forEdit
                      ? defaultData?.date_of_birth === "null"
                        ? "1997-05-24"
                        : defaultData?.date_of_birth
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
                    defaultValue={forEdit ? defaultData?.gender : ""}
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
                  defaultValue={forEdit ? defaultData?.aadhaar_number : ""}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    User Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e) => handleChange(e, "role")}
                    label="User Type"
                    defaultValue={forEdit ? defaultData?.type : ""}
                  >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="USER">USER</MenuItem>
                    <MenuItem value="AMC">AMC</MenuItem>
                    <MenuItem value="ENGINEER">ENGINEER</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {userTypeAMC && (
              <>
                <p style={{ marginTop: "10px" }}>Company Information</p>
                <Divider />
                <div className="registerModalBody">
                  <div
                    className="registerModalBodyField"
                    style={{ marginTop: "15px" }}
                  >
                    <TextField
                      margin="dense"
                      id="name"
                      label="Company Name"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={forEdit ? defaultData?.company_name : ""}
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
                        forEdit
                          ? defaultData?.date_of_registration === "null"
                            ? "1997-05-24"
                            : defaultData?.date_of_registration
                          : "1997-05-24"
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
                        forEdit
                          ? defaultData?.plan_activation_date === "null"
                            ? "1997-05-24"
                            : defaultData?.plan_activation_date
                          : "1997-05-24"
                      }
                    />
                  </div>
                  <div
                    className="registerModalBodyField"
                    style={{ marginTop: "15px" }}
                  >
                    <TextField
                      required
                      margin="dense"
                      id="name"
                      label="User Plan"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={forEdit ? defaultData?.user_plan : ""}
                      onChange={(e) => handleChange(e, "user_plan")}
                    />
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Device
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={(e) => handleChange(e, "device")}
                        label="Gender"
                        defaultValue={forEdit ? defaultData?.device : ""}
                      >
                        <MenuItem value="desktop">Desktop</MenuItem>
                        <MenuItem value="laptop">Laptop</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
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
                        forEdit
                          ? defaultData?.plan_expired_date === "null"
                            ? "1997-05-24"
                            : defaultData?.plan_expired_date
                          : "1997-05-24"
                      }
                    />
                  </div>
                  <div
                    className="registerModalBodyField"
                    style={{ marginTop: "15px" }}
                  >
                    <TextField
                      required
                      margin="dense"
                      id="name"
                      label="GST Number"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={forEdit ? defaultData?.gst_number : ""}
                      onChange={(e) => handleChange(e, "gst_number")}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="name"
                      label="PAN Number"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={forEdit ? defaultData?.pan_number : ""}
                      onChange={(e) => handleChange(e, "pan_number")}
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
                placeholder="Placeholder"
                multiline
                maxRows={4}
                variant="standard"
                fullWidth
                onChange={(e) => handleChange(e, "current_address")}
                defaultValue={forEdit ? defaultData?.current_address : ""}
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
                  defaultValue={forEdit ? defaultData?.current_city : ""}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Current State"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "current_state")}
                  defaultValue={forEdit ? defaultData?.current_state : ""}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Current Pincode"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "current_pincode")}
                  defaultValue={forEdit ? defaultData?.current_pincode : ""}
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
                placeholder="Placeholder"
                multiline
                maxRows={4}
                variant="standard"
                fullWidth
                onChange={(e) => handleChange(e, "permanent_address")}
                defaultValue={
                  forEdit ? defaultData?.permanent_address : permanentAddress
                }
              />
              <div className="registerModalBodyField">
                <TextField
                  margin="dense"
                  id="name"
                  label="Permanent City"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleChange(e, "permanent_city")}
                  defaultValue={
                    forEdit ? defaultData?.permanent_city : permanentCity
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
                  defaultValue={
                    forEdit ? defaultData?.permanent_state : permanentState
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
                  defaultValue={
                    forEdit ? defaultData?.permanent_pincode : permanentPincode
                  }
                />
              </div>
            </div>
            <Stack spacing={2} direction="row" className="register-btn-block">
              <Button variant="outlined" onClick={() => handleSubmit()}>
                {forEdit ? "EDIT" : "SUBMIT"}
              </Button>
            </Stack>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default RegisterUser;

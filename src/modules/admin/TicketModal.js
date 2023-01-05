import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const baseConfig = config[config.serviceServerName["auth"]];

export default function TicketModal(props) {
  const { show, onHide, forEdit, forView, mobile, closeEdit, closeView } =
    props;

  const dispatch = useDispatch();
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
        const response = await registerUser(data);
        if (response?.data?.success) {
          dispatch(ADD_USER({ data }));
          notification.success({
            message: "Success",
            description: "User Registration Successfully !!",
            duration: 4,
            className: "notification-green",
          });
        } else {
          errorHandler(
            "Technical Error",
            "There may be some error occurred while processing the request. Please try after some time."
          );
        }
      }
    }
    refetch();
    onHide();
  };

  useEffect(() => {
    if (userList.length > 0) {
      userList.map((item) => {
        if (item.mobile === mobile) {
          setDefaultData(item);
        }
      });
    }
  }, [forEdit, forView, show]);

  const handleCancel = () => {
    onHide();
    if (forEdit) {
      closeEdit();
    } else if (forView) {
      closeView();
    }
  };

  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];

  return (
    <div>
      <Dialog open={show} onClose={onHide} maxWidth="lg" fullWidth={true}>
        <DialogTitle className="registerModalTitle">New Ticket</DialogTitle>
        <DialogContent>
          <Divider />
          <div className="registerModalBody">
            <div className="registerModalBodyField">
              <Autocomplete
                options={top100Films}
                sx={{ width: 500 }}
                id="auto-complete"
                autoComplete
                includeInputInList
                renderInput={(params) => (
                  <TextField {...params} label="Customer" variant="standard" />
                )}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Parent Service
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "gender")}
                  label="Parent Service"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="female"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="On site service"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Pickup drop service"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Online service"
                />
              </RadioGroup>
            </FormControl>
            <div className="registerModalBodyField">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Brand
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "gender")}
                  label="Brand"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                margin="dense"
                id="name"
                label="Serial Number"
                type="text"
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
                margin="dense"
                id="name"
                label="Model number"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "mobile_number")}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Service Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "gender")}
                  label="Service Type"
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
                disabled={forView}
                id="standard-textarea"
                label="Description"
                placeholder="Placeholder"
                multiline
                variant="standard"
                fullWidth
                onChange={(e) => handleChange(e, "current_address")}
                defaultValue={
                  forEdit || forView ? defaultData?.current_address : ""
                }
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "role")}
                  label="Priority"
                  defaultValue={forEdit || forView ? defaultData?.type : ""}
                  disabled={forView}
                >
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="AMC">AMC</MenuItem>
                  <MenuItem value="ENGINEER">ENGINEER</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="registerModalBody">
            <TextField
              disabled={forView}
              id="standard-textarea"
              label="Remark"
              placeholder="Placeholder"
              multiline
              variant="standard"
              fullWidth
              onChange={(e) => handleChange(e, "current_address")}
              defaultValue={
                forEdit || forView ? defaultData?.current_address : ""
              }
            />
            <div className="registerModalBodyField">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Assign Engineer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "gender")}
                  label="Assign Engineer"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                disabled
                margin="dense"
                id="name"
                label="Ticket Number"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "current_state")}
                defaultValue={
                  forEdit || forView ? defaultData?.current_state : ""
                }
              />
              <TextField
                disabled
                margin="dense"
                id="name"
                label="Date"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "current_pincode")}
                defaultValue={
                  forEdit || forView ? defaultData?.current_pincode : ""
                }
              />
            </div>
            <div className="registerModalBodyField">
              <TextField
                disabled
                margin="dense"
                id="name"
                label="Mobile"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "permanent_city")}
                defaultValue={
                  forEdit || forView
                    ? defaultData?.permanent_city
                    : permanentCity
                }
              />
              <TextField
                disabled
                margin="dense"
                id="name"
                label="Email"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "permanent_state")}
                defaultValue={
                  forEdit || forView
                    ? defaultData?.permanent_state
                    : permanentState
                }
              />
            </div>
            <TextField
              disabled
              margin="dense"
              id="name"
              label="Permanent Address"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e, "permanent_pincode")}
              defaultValue={
                forEdit || forView
                  ? defaultData?.permanent_pincode
                  : permanentPincode
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={isChecked}
                  onChange={(e) => handleCheckBoxClicked(e)}
                />
              }
              label="Current address same as Permanent address"
            />
            <TextField
              margin="dense"
              id="name"
              label="Current Address"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e, "permanent_pincode")}
              defaultValue={
                forEdit || forView
                  ? defaultData?.permanent_pincode
                  : permanentPincode
              }
            />
            <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="registerModalBtn" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button className="registerModalBtn" onClick={() => handleSubmit()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

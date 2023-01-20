import React, { useEffect } from "react";
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
import { useGetUserByIdQuery } from "../../services/admin";

export default function RegisterUserModal(props) {
  const { show, onHide, forView, mobile, closeView, userId } = props;

  const { data, error, isLoading } = useGetUserByIdQuery(userId);

  useEffect(() => {}, [forView, show]);

  const handleCancel = () => {
    onHide();
    closeView();
  };

  return (
    <div>
      <Dialog open={show} onClose={onHide} maxWidth="lg" fullWidth={true}>
        <DialogTitle className="registerModalTitle">{"View User"}</DialogTitle>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <DialogContent>
              <DialogContentText className="registerModalContentText">
                Personal Information
              </DialogContentText>
              <Divider />
              <div className="registerModalBody">
                <div className="registerModalBodyField">
                  <TextField
                    required
                    disabled={forView}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={
                      forView ? data?.data?.rows?.userDetail?.first_name : ""
                    }
                    onChange={(e) => handleChange(e, "first_name")}
                  />
                  <TextField
                    margin="dense"
                    disabled={forView}
                    id="name"
                    label="Middle Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={
                      forView
                        ? data?.data?.rows?.userDetail?.middle_name === null
                          ? ""
                          : data?.data?.rows?.userDetail?.middle_name
                        : ""
                    }
                    onChange={(e) => handleChange(e, "middle_name")}
                  />
                  <TextField
                    margin="dense"
                    disabled={forView}
                    id="name"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={
                      forView
                        ? data?.data?.rows?.userDetail?.last_name === null
                          ? ""
                          : data?.data?.rows?.userDetail?.last_name
                        : ""
                    }
                    onChange={(e) => handleChange(e, "last_name")}
                  />
                </div>
                <div className="registerModalBodyField">
                  <TextField
                    disabled={forView}
                    required
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    defaultValue={
                      forView ? data?.data?.rows?.userDetail?.email : ""
                    }
                    onChange={(e) => handleChange(e, "email")}
                  />
                  <TextField
                    required
                    disabled={forView}
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
                    disabled={forView}
                    margin="dense"
                    id="name"
                    label="Mobile Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={
                      forView ? data?.data?.rows?.userDetail?.mobile : ""
                    }
                    onChange={(e) => handleChange(e, "mobile_number")}
                  />
                  <TextField
                    id="date"
                    disabled={forView}
                    label="Date Of Birth"
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => handleChange(e, "dob")}
                    defaultValue={
                      forView
                        ? data?.data?.rows?.userDetail?.date_of_birth === null
                          ? "1997-05-24"
                          : data?.data?.rows?.userDetail?.date_of_birth.split(
                              "T"
                            )[0]
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
                        forView ? data?.data?.rows?.userDetail?.gender : ""
                      }
                      disabled={forView}
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
                    margin="dense"
                    id="name"
                    label="Aadhaar Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleChange(e, "aadhaar")}
                    defaultValue={
                      forView
                        ? data?.data?.rows?.userDetail?.aadhaar_number
                        : ""
                    }
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
                      defaultValue={
                        forView ? data?.data?.rows?.userDetail?.role : ""
                      }
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
              {data?.data?.rows?.userDetail?.role === "AMC" && (
                <>
                  <DialogContentText
                    className="registerModalContentText"
                    style={{ marginTop: "20px" }}
                  >
                    Company Information
                  </DialogContentText>
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
                        disabled={forView}
                        fullWidth
                        variant="standard"
                        defaultValue={
                          forView
                            ? data?.data?.rows?.amcDetail?.company_name === null
                              ? ""
                              : data?.data?.rows?.amcDetail?.company_name
                            : ""
                        }
                        onChange={(e) => handleChange(e, "company_name")}
                      />
                      <TextField
                        id="date"
                        label="Date of Registration"
                        type="date"
                        disabled={forView}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) =>
                          handleChange(e, "date_of_registration")
                        }
                        defaultValue={
                          forView
                            ? data?.data?.rows?.amcDetail?.date_of_registration.split(
                                "T"
                              )[0]
                            : "1997-05-24"
                        }
                      />
                      <TextField
                        id="date"
                        label="Plan Activation Date"
                        type="date"
                        disabled={forView}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) =>
                          handleChange(e, "plan_activation_date")
                        }
                        defaultValue={
                          forView
                            ? data?.data?.rows?.amcDetail?.plan_activation_date.split(
                                "T"
                              )[0]
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
                        disabled={forView}
                        fullWidth
                        variant="standard"
                        defaultValue={
                          forView ? data?.data?.rows?.amcDetail?.user_plan : ""
                        }
                        onChange={(e) => handleChange(e, "user_plan")}
                      />
                      <TextField
                        id="date"
                        label="Plan Expired Date"
                        type="date"
                        disabled={forView}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => handleChange(e, "plan_expired_date")}
                        defaultValue={
                          forView
                            ? data?.data?.rows?.amcDetail?.plan_expired_date.split(
                                "T"
                              )[0]
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
                        disabled={forView}
                        defaultValue={
                          forView ? data?.data?.rows?.amcDetail?.gst_number : ""
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
                        disabled={forView}
                        defaultValue={
                          forView ? data?.data?.rows?.amcDetail?.pan_number : ""
                        }
                        onChange={(e) => handleChange(e, "pan_number")}
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
                          disabled={forView}
                          defaultValue={
                            forView ? data?.data?.rows?.amcDetail?.device : ""
                          }
                        >
                          <MenuItem value="desktop">Desktop</MenuItem>
                          <MenuItem value="laptop">Laptop</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </>
              )}
              <DialogContentText
                className="registerModalContentText"
                style={{ marginTop: "20px" }}
              >
                Address Information
              </DialogContentText>
              <Divider />
              <div className="registerModalBody">
                <TextField
                  disabled={forView}
                  id="standard-textarea"
                  label="Current Address"
                  placeholder="Placeholder"
                  multiline
                  maxRows={4}
                  variant="standard"
                  fullWidth
                  onChange={(e) => handleChange(e, "current_address")}
                  defaultValue={
                    forView ? data?.data?.rows?.userDetail?.current_address : ""
                  }
                />
                <div className="registerModalBodyField">
                  <TextField
                    disabled={forView}
                    margin="dense"
                    id="name"
                    label="Current City"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleChange(e, "current_city")}
                    defaultValue={
                      forView ? data?.data?.rows?.userDetail?.current_city : ""
                    }
                  />
                  <TextField
                    disabled={forView}
                    margin="dense"
                    id="name"
                    label="Current State"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleChange(e, "current_state")}
                    defaultValue={
                      forView ? data?.data?.rows?.userDetail?.current_state : ""
                    }
                  />
                  <TextField
                    disabled={forView}
                    margin="dense"
                    id="name"
                    label="Current Pincode"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleChange(e, "current_pincode")}
                    defaultValue={
                      forView
                        ? data?.data?.rows?.userDetail?.current_pincode
                        : ""
                    }
                  />
                </div>
                <TextField
                  disabled={forView}
                  id="standard-textarea"
                  label="Permanent Address"
                  placeholder="Placeholder"
                  multiline
                  maxRows={4}
                  variant="standard"
                  fullWidth
                  onChange={(e) => handleChange(e, "permanent_address")}
                  defaultValue={
                    forView
                      ? data?.data?.rows?.userDetail?.permanent_address
                      : ""
                  }
                />
                <div className="registerModalBodyField">
                  <TextField
                    disabled={forView}
                    margin="dense"
                    id="name"
                    label="Permanent City"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleChange(e, "permanent_city")}
                    defaultValue={
                      forView
                        ? data?.data?.rows?.userDetail?.permanent_city
                        : ""
                    }
                  />
                  <TextField
                    disabled={forView}
                    margin="dense"
                    id="name"
                    label="Permanent State"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleChange(e, "permanent_state")}
                    defaultValue={
                      forView
                        ? data?.data?.rows?.userDetail?.permanent_state
                        : ""
                    }
                  />
                  <TextField
                    disabled={forView}
                    margin="dense"
                    id="name"
                    label="Permanent Pincode"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleChange(e, "permanent_pincode")}
                    defaultValue={
                      forView
                        ? data?.data?.rows?.userDetail?.permanent_pincode
                        : ""
                    }
                  />
                </div>
              </div>
            </DialogContent>
          </>
        ) : (
          <></>
        )}
        <DialogActions>
          <Button className="registerModalBtn" onClick={() => handleCancel()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

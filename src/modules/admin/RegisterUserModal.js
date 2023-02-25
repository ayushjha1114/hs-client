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
import Helper from "../../util/helper";

export default function RegisterUserModal(props) {
  const { show, onHide, forView, mobile, closeView, userId } = props;

  const { data, error, isLoading } = useGetUserByIdQuery(userId);
  console.log(
    "🚀 ~ file: RegisterUserModal.js:21 ~ RegisterUserModal ~ data:",
    data
  );

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
                      forView ? data?.data?.userDetail?.first_name : ""
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
                        ? data?.data?.userDetail?.middle_name === null
                          ? ""
                          : data?.data?.userDetail?.middle_name
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
                        ? data?.data?.userDetail?.last_name === null
                          ? ""
                          : data?.data?.userDetail?.last_name
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
                    defaultValue={forView ? data?.data?.userDetail?.email : ""}
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
                    defaultValue={forView ? data?.data?.userDetail?.mobile : ""}
                    onChange={(e) => handleChange(e, "mobile_number")}
                  />
                  <TextField
                    id="date"
                    disabled={forView}
                    margin="dense"
                    variant="standard"
                    label="Date Of Birth"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={
                      forView
                        ? data?.data?.userDetail?.date_of_birth === null
                          ? "-"
                          : data?.data?.userDetail?.date_of_birth.split("T")[0]
                        : "-"
                    }
                  />
                  <TextField
                    required
                    disabled={forView}
                    margin="dense"
                    id="Gender"
                    label="Gender"
                    type="text"
                    variant="standard"
                    value={forView ? data?.data?.userDetail?.gender : ""}
                    onChange={(e) => handleChange(e, "mobile_number")}
                  />
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
                    defaultValue={
                      forView ? data?.data?.userDetail?.aadhaar_number : ""
                    }
                  />
                  <TextField
                    disabled={forView}
                    margin="dense"
                    id="name"
                    label="User Type"
                    type="text"
                    // fullWidth
                    variant="standard"
                    value={
                      forView
                        ? Helper.transformUserType(data?.data?.userDetail?.role)
                        : ""
                    }
                  />
                </div>
              </div>
              {(data?.data?.userDetail?.role === "AMC" ||
                data?.data?.userDetail?.role === "USER") && (
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
                            ? data?.data?.userDetail?.company_name === "null"
                              ? "-"
                              : data?.data?.userDetail?.company_name
                            : "-"
                        }
                        onChange={(e) => handleChange(e, "company_name")}
                      />
                      <TextField
                        id="date"
                        label="Date of Registration"
                        type="text"
                        disabled={forView}
                        margin="dense"
                        variant="standard"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        defaultValue={
                          forView
                            ? data?.data?.userDetail?.date_of_registration.split(
                                "T"
                              )[0]
                            : "-"
                        }
                      />
                      {data?.data?.userDetail?.role === "AMC" && (
                        <>
                          <TextField
                            id="date"
                            label="Plan Activation Date"
                            type="text"
                            disabled={forView}
                            margin="dense"
                            variant="standard"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            defaultValue={
                              forView
                                ? data?.data?.userDetail?.amcDetail?.plan_activation_date.split(
                                    "T"
                                  )[0]
                                : "-"
                            }
                          />
                          <TextField
                            id="date"
                            margin="dense"
                            label="Plan Expired Date"
                            type="text"
                            disabled={forView}
                            variant="standard"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={
                              forView
                                ? data?.data?.userDetail?.amcDetail?.plan_expired_date.split(
                                    "T"
                                  )[0]
                                : "-"
                            }
                          />
                        </>
                      )}
                    </div>
                    {data?.data?.userDetail?.role === "AMC" && (
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
                            forView
                              ? data?.data?.userDetail?.amcDetail?.user_plan !==
                                "null"
                                ? data?.data?.userDetail?.amcDetail?.user_plan
                                : "-"
                              : "-"
                          }
                        />
                        <TextField
                          margin="dense"
                          id="name"
                          label="Device"
                          type="text"
                          disabled={forView}
                          fullWidth
                          variant="standard"
                          defaultValue={
                            forView
                              ? JSON.parse(
                                  data?.data?.userDetail?.amcDetail?.device
                                ).toString()
                              : ""
                          }
                        />
                      </div>
                    )}
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
                          forView
                            ? data?.data?.userDetail?.gst_number !== "null"
                              ? data?.data?.userDetail?.gst_number
                              : "-"
                            : "-"
                        }
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
                          forView
                            ? data?.data?.userDetail?.pan_number !== "null"
                              ? data?.data?.userDetail?.pan_number
                              : "-"
                            : "-"
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
                        label="Director Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        disabled={forView}
                        defaultValue={
                          forView
                            ? data?.data?.userDetail?.director_email !== "null"
                              ? data?.data?.userDetail?.director_email
                              : "-"
                            : "-"
                        }
                      />
                      <TextField
                        margin="dense"
                        id="name"
                        label="Admin Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        disabled={forView}
                        defaultValue={
                          forView
                            ? data?.data?.userDetail?.admin_email !== "null"
                              ? data?.data?.userDetail?.admin_email
                              : "-"
                            : "-"
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
                        label="Contact Person Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        disabled={forView}
                        defaultValue={
                          forView
                            ? data?.data?.userDetail?.contact_person_name !==
                              "null"
                              ? data?.data?.userDetail?.contact_person_name
                              : "-"
                            : "-"
                        }
                      />
                      <TextField
                        margin="dense"
                        id="name"
                        label="Contact Person Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        disabled={forView}
                        defaultValue={
                          forView
                            ? data?.data?.userDetail?.contact_person_number !==
                              "null"
                              ? data?.data?.userDetail?.contact_person_number
                              : "-"
                            : "-"
                        }
                      />
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
                    forView ? data?.data?.userDetail?.current_address : ""
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
                      forView ? data?.data?.userDetail?.current_city : ""
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
                      forView ? data?.data?.userDetail?.current_state : ""
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
                      forView ? data?.data?.userDetail?.current_pincode : ""
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
                    forView ? data?.data?.userDetail?.permanent_address : ""
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
                      forView ? data?.data?.userDetail?.permanent_city : ""
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
                      forView ? data?.data?.userDetail?.permanent_state : ""
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
                      forView ? data?.data?.userDetail?.permanent_pincode : ""
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

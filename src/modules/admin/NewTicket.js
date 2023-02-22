import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DialogContent,
  TextField,
  FormControlLabel,
  FormControl,
  Autocomplete,
  Checkbox,
  Typography,
  Divider,
  Card,
  CardActions,
  InputAdornment,
  CardContent,
  CardHeader,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BoyOutlined } from "@mui/icons-material";
import UserLayout from "../../layout/User";
import CircularProgress from "@mui/material/CircularProgress";
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";
import { useLazyGetAllUserQuery } from "../../services/admin";
import Helper from "../../util/helper";
import moment from "moment";

const NewTicket = (props) => {
  const dispatch = useDispatch();
  const [forEdit, setForEdit] = useState(/* location?.state?.forEdit */ false);
  const [customerList, setCustomerList] = useState([]);
  const [customerType, setCustomerType] = useState("");
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [defaultUserDetail, setDefaultUserDetail] = useState({});

  const [trigger, result] = useLazyGetAllUserQuery();

  const { handleSubmit, control, reset, setValue, watch } = useForm();

  const onSubmit = async (data) => {
    console.log("🚀 ~ file: NewTicket.js:42 ~ onSubmit ~ data:", data);
    // if (forEdit) {
    //   let modifiedData = data;
    //   modifiedData.mobile = mobile;
    //   if (modifiedData?.amcDetail?.device)
    //     modifiedData.amcDetail.device = JSON.stringify(
    //       modifiedData.amcDetail?.device
    //     );
    //   dispatch(SET_LOADING({ data: true }));
    //   const response = await updateUserDetail(modifiedData);
    //   if (response?.data?.success) {
    //     dispatch(SET_LOADING({ data: false }));
    //     dispatch(
    //       SET_SNACKBAR({
    //         open: true,
    //         message: "Update Successfully !",
    //         variant: "success",
    //       })
    //     );
    //     refetch();
    //     navigate("/admin/user-management");
    //   } else {
    //     dispatch(SET_LOADING({ data: false }));
    //     dispatch(
    //       SET_SNACKBAR({
    //         open: true,
    //         message: "Technical Error",
    //         variant: "error",
    //       })
    //     );
    //   }
    // } else {
    //   console.log(data);
    //   const encryptedPassword = AES.encrypt(
    //     data?.password,
    //     baseConfig.encryptionKey
    //   ).toString();
    //   data.password = encryptedPassword;
    //   let userData = {};
    //   userData.userDetail = data;
    //   if (data?.amcDetail?.device)
    //     data.amcDetail.device = JSON.stringify(data.amcDetail?.device);
    //   dispatch(SET_LOADING({ data: true }));
    //   const response = await registerUser(data);
    //   if (response?.data?.success) {
    //     dispatch(SET_LOADING({ data: false }));
    //     dispatch(
    //       SET_SNACKBAR({
    //         open: true,
    //         message: "User Registration Successfully !",
    //         variant: "success",
    //       })
    //     );
    //     refetch();
    //     navigate("/admin/user-management");
    //   } else {
    //     dispatch(SET_LOADING({ data: false }));
    //     dispatch(
    //       SET_SNACKBAR({
    //         open: true,
    //         message: "Technical Error",
    //         variant: "error",
    //       })
    //     );
    //   }
    // }
  };

  const { data, error, isError, isLoading, isFetching } = result;
  useEffect(() => {
    if (data?.success) {
      const userList = data?.data?.rows.map((user) => {
        return {
          label: Helper.transformUserName(user),
          type: user.role,
          ...user,
        };
      });
      setCustomerList(userList);
      setIsCustomerLoading(false);
    }
  }, [isCustomerLoading, data, isLoading]);

  const handleCustomerSearch = (event) => {
    trigger({
      limit: 99999,
      offset: 0,
      search: event.target.value,
      isTypeCustomer: true,
    });
    setIsCustomerLoading(true);
  };

  const handleCustomerSelect = (e) => {
    customerList.map((customer) => {
      if (customer.label === e.target.value) {
        setDefaultUserDetail(customer);
        setCustomerType(customer.role);
      }
    });
  };

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
          <CardHeader title={"New Ticket"}></CardHeader>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <fieldset
                style={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}
              >
                <legend style={{ width: "fit-content", textAlign: "center" }}>
                  Customer Information
                </legend>
                <Grid container sx={{ padding: "2%" }} spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      id="customer"
                      options={customerList}
                      size="small"
                      onSelect={(e) => handleCustomerSelect(e)}
                      noOptionsText="No Customer Found"
                      onInputChange={(event) => handleCustomerSearch(event)}
                      fullWidth
                      renderOption={(props, option) => (
                        <li {...props}>
                          <Grid container alignItems="center">
                            <Grid
                              item
                              sx={{
                                width: "calc(100% - 44px)",
                                wordWrap: "break-word",
                              }}
                            >
                              <Box component="span">{option.label}</Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {option.type === "AMC"
                                  ? "AMC Customer"
                                  : "Customer"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Customer"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {isCustomerLoading ? (
                                  <CircularProgress color="primary" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      id="Registration Date"
                      value={
                        defaultUserDetail?.date_of_registration
                          ? moment(
                              defaultUserDetail?.date_of_registration
                            ).format("DD/MM/YYYY")
                          : "-"
                      }
                      size="small"
                      fullWidth
                      label="Registration Date"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      id="Email"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={defaultUserDetail?.email}
                      size="small"
                      fullWidth
                      label="Email"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      id="Mobile Number"
                      value={defaultUserDetail?.mobile}
                      size="small"
                      fullWidth
                      label="Mobile Number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={4} xs={6} md={8}>
                    <TextField
                      disabled
                      id="Current Address"
                      value={`${
                        defaultUserDetail?.current_address
                          ? defaultUserDetail?.current_address
                          : ""
                      } ${
                        defaultUserDetail?.current_city
                          ? defaultUserDetail?.current_city
                          : ""
                      } ${
                        defaultUserDetail?.current_state
                          ? defaultUserDetail?.current_state
                          : ""
                      } ${
                        defaultUserDetail?.current_pincode
                          ? defaultUserDetail?.current_pincode
                          : ""
                      }`}
                      size="small"
                      fullWidth
                      label="Current Address"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      id="Contact Person Name"
                      value={
                        defaultUserDetail?.contact_person_name
                          ? defaultUserDetail?.contact_person_name
                          : "-"
                      }
                      size="small"
                      fullWidth
                      label="Contact Person Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      id="Contact Person Email"
                      value={
                        defaultUserDetail?.contact_person_email
                          ? defaultUserDetail?.contact_person_email
                          : "-"
                      }
                      size="small"
                      fullWidth
                      label="Contact Person Email"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </CardContent>
            <CardContent>
              {customerType === "AMC" && (
                <fieldset
                  style={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}
                >
                  <legend style={{ width: "fit-content", textAlign: "center" }}>
                    AMC Information
                  </legend>
                  <Grid container sx={{ padding: "2%" }} spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        disabled
                        id="User Plan"
                        value={defaultUserDetail?.amc?.user_plan}
                        size="small"
                        fullWidth
                        label="User Plan"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        disabled
                        id="Plan Activation Date"
                        value={
                          defaultUserDetail?.amc?.plan_activation_date
                            ? moment(
                                defaultUserDetail?.amc?.plan_activation_date
                              ).format("DD/MM/YYYY")
                            : "-"
                        }
                        size="small"
                        fullWidth
                        label="Plan Activation Date"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        disabled
                        id="Plan Expire Date"
                        value={
                          defaultUserDetail?.amc?.plan_expired_date
                            ? moment(
                                defaultUserDetail?.amc?.plan_expired_date
                              ).format("DD/MM/YYYY")
                            : "-"
                        }
                        type="text"
                        size="small"
                        fullWidth
                        label="Plan Expired Date"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </fieldset>
              )}
            </CardContent>
            <CardContent>
              <fieldset
                style={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}
              >
                <legend style={{ width: "fit-content", textAlign: "center" }}>
                  Ticket Information
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
                        <Autocomplete
                          // options={customerList}
                          size="small"
                          id="auto-complete"
                          autoComplete
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Parent Service"
                              variant="outlined"
                            />
                          )}
                          onSelect={(e) => handleChange(e, "customer")}
                        />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "Customer is required.",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      // options={customerList}
                      size="small"
                      id="auto-complete"
                      autoComplete
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Service Provide"
                          variant="outlined"
                        />
                      )}
                      onSelect={(e) => handleChange(e, "customer")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={<Checkbox disabled />}
                      label="ON-SITE"
                    />
                    <FormControlLabel
                      control={<Checkbox disabled />}
                      label="ONLINE"
                    />
                    <FormControlLabel
                      control={<Checkbox disabled />}
                      label="PICK AND DROP"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="first_name"
                      control={control}
                      render={({
                        field: { onChange, value, name },
                        fieldState: { error },
                      }) => (
                        <Autocomplete
                          // options={customerList}
                          size="small"
                          id="auto-complete"
                          autoComplete
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Brand"
                              variant="outlined"
                            />
                          )}
                          onSelect={(e) => handleChange(e, "customer")}
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
                      name="priority"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <FormControl size="small" fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Priority
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Priority"
                            onChange={onChange}
                          >
                            <MenuItem value="LOW">LOW</MenuItem>
                            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                            <MenuItem value="HIGH">HIGH</MenuItem>
                            <MenuItem value="URGENT">URGENT</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                    {/* <FormControl variant="outlined" size="small" fullWidth>
                      <InputLabel id="demo-simple-select-standard-label">
                        Priority
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        // onChange={(e) => handleChange(e, "priority")}
                        label="Priority"
                        // defaultValue={forEdit || forView ? defaultData?.type : ""}
                        // disabled={forView}
                      >
                        <MenuItem value="LOW">LOW</MenuItem>
                        <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                        <MenuItem value="HIGH">HIGH</MenuItem>
                        <MenuItem value="URGENT">URGENT</MenuItem>
                      </Select>
                    </FormControl> */}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="serial_number"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Serial Number is required.",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id="Serial Number"
                          error={!!error}
                          helperText={error?.message}
                          value={value}
                          onChange={onChange}
                          size="small"
                          fullWidth
                          label="Serial Number"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="email"
                      // onChange={onChange}
                      // value={value}
                      // error={!!error}
                      // helperText={error?.message}
                      type="text"
                      size="small"
                      fullWidth
                      label="Model Number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={4} xs={6} md={8}>
                    <TextField
                      id="email"
                      // onChange={onChange}
                      // value={value}
                      // error={!!error}
                      // helperText={error?.message}
                      type="text"
                      size="small"
                      fullWidth
                      label="Description"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={4} xs={6} md={8}>
                    <TextField
                      id="email"
                      // onChange={onChange}
                      // value={value}
                      // error={!!error}
                      // helperText={error?.message}
                      type="text"
                      size="small"
                      fullWidth
                      label="Remark"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      // options={customerList}
                      size="small"
                      id="auto-complete"
                      autoComplete
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Assign Engineer"
                          variant="outlined"
                        />
                      )}
                      // onSelect={(e) => handleChange(e, "customer")}
                    />
                  </Grid>
                  <Grid item sm={4} xs={6} md={12}>
                    <TextField
                      id="email"
                      // onChange={onChange}
                      // value={value}
                      // error={!!error}
                      // helperText={error?.message}
                      type="text"
                      size="small"
                      fullWidth
                      label="Visit Address"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="email"
                      // onChange={onChange}
                      // value={value}
                      // error={!!error}
                      // helperText={error?.message}
                      type="text"
                      size="small"
                      fullWidth
                      label="Visit City"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="email"
                      // onChange={onChange}
                      // value={value}
                      // error={!!error}
                      // helperText={error?.message}
                      type="text"
                      size="small"
                      fullWidth
                      label="Visit State"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="email"
                      // onChange={onChange}
                      // value={value}
                      // error={!!error}
                      // helperText={error?.message}
                      type="text"
                      size="small"
                      fullWidth
                      label="Visit Pincode"
                      variant="outlined"
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

export default NewTicket;

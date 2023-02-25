import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
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
  RadioGroup,
  Radio,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BoyOutlined } from "@mui/icons-material";
import UserLayout from "../../layout/User";
import CircularProgress from "@mui/material/CircularProgress";
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";
import {
  useGetUserListBySearchMutation,
  useGetAllTicketQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
} from "../../services/admin";
import Helper from "../../util/helper";
import moment from "moment";

const NewTicket = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const serviceList = useSelector((state) => state.admin.serviceList);
  const brandList = useSelector((state) => state.admin.brandList);
  const userList = useSelector((state) => state.admin.userList);
  const amcList = useSelector((state) => state.admin.amcList);

  const [createTicket] = useCreateTicketMutation();
  const [updateTicket] = useUpdateTicketMutation();
  const { refetch } = useGetAllTicketQuery({ limit: 99999999, offset: 0 });

  const [customerList, setCustomerList] = useState([]);
  const [customerType, setCustomerType] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [defaultUserDetail, setDefaultUserDetail] = useState({});
  const [parentServiceList, setParentServiceList] = useState([]);
  const [serviceProvidedList, setServiceProvidedList] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [isEngineerLoading, setIsEngineerLoading] = useState(false);
  const [engineerList, setEngineerList] = useState([]);
  const [engineerName, setEngineerName] = useState('');
  const [ticket, setTicket] = React.useState({});
  const [forEdit, setForEdit] = useState(location?.state?.forEdit);
  const [id, setId] = useState(location?.state?.id);

  const [getUserListBySearch] = useGetUserListBySearchMutation();

  const defaultValues = {
    customer: "",
    engineer: "",
    brand: "",
    description: "",
    model_number: "",
    parent_service: "",
    priority: "",
    remark: "",
    serial_number: "",
    service_provided: "",
    service_type: "",
    address: {
      visit_address: "",
      visit_city: "",
      visit_pincode: "",
      visit_state: "",
    },
  };

  const { handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues,
    values: ticket,
  });

  const parentService = watch("parent_service");
  const serviceProvided = watch("service_provided");
  const watchTicket = watch();

  const onSubmit = async (data) => {
    console.log("🚀 ~ file: NewTicket.js:42 ~ onSubmit ~ data:", data, engineerName);
    data.engineer = engineerName;
    if (forEdit) {
      dispatch(SET_LOADING({ data: true }));
      const response = await updateTicket(data);
      if (response?.data?.success) {
        dispatch(SET_LOADING({ data: false }));
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Update Ticket Successfully !",
            variant: "success",
          })
        );
        refetch();
        navigate("/admin/tickets");
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
      dispatch(SET_LOADING({ data: true }));
      let finalTicketData = data;
      finalTicketData.customer = customerValue;
      finalTicketData.email = defaultUserDetail.email;
      finalTicketData.mobile = defaultUserDetail.mobile;
      finalTicketData.address = JSON.stringify(finalTicketData.address);
      finalTicketData.customer_plan = defaultUserDetail?.amc?.user_plan ? defaultUserDetail?.amc?.user_plan : '';
      console.log(
        "🚀 ~ file: NewTicket.js:130 ~ onSubmit ~ finalTicketData:",
        finalTicketData
      );
      const response = await createTicket(finalTicketData);
      if (response?.data?.success) {
        dispatch(SET_LOADING({ data: false }));
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Ticket Created Successfully !",
            variant: "success",
          })
        );
        refetch();
        navigate("/admin/tickets");
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

  useEffect(() => {
    setTicket(location?.state?.editData);
    setForEdit(location?.state?.forEdit);
    let userDataById = {};
    userList.map((user) => {
      if (
        Helper.transformUserName(user) === location?.state?.editData.customer
      ) {
        userDataById = user;
        if (location?.state?.editData.customer_plan) {
          amcList.map((amc) => {
            if (amc.user_profile_id === user.id)
            userDataById = Object.assign({}, user, { amc: { ...amc } });
          });
          setDefaultUserDetail(userDataById);
          setCustomerType(user.role);
        }
      }
    });
    setEngineerName(location?.state?.editData.engineer)

    console.log(
      "🚀 ~ file: NewTicket.js:169 ~ useEffect ~ location?.state?.editData:",
      location?.state?.editData
    );
  }, [location?.state?.forEdit, location?.state?.id]);

  const handleCustomerSearch = async (event, value) => {
    setIsCustomerLoading(true);
    const response = await getUserListBySearch({
      searchTerm: value,
      isTypeCustomer: true,
    });
    if (response?.data?.success) {
      setIsCustomerLoading(false);
      const userList = response?.data?.data?.rows.map((user) => {
        return {
          label: Helper.transformUserName(user),
          type: user.role,
          ...user,
        };
      });
      setCustomerList(userList);
    } else {
      setIsCustomerLoading(false);
      // dispatch(
      //   SET_SNACKBAR({
      //     open: true,
      //     message: "Technical Error",
      //     variant: "error",
      //   })
      // );
    }
  };

  const handleCustomerSelect = (e) => {
    customerList.map((customer) => {
      if (customer.label === e.target.value) {
        setDefaultUserDetail(customer);
        setCustomerValue(e.target.value);
        setCustomerType(customer.role);
      }
    });
  };

  useEffect(() => {
    if (serviceList.length > 0) {
      const data = serviceList.map((item) => {
        return item.name;
      });
      setParentServiceList(data);
    }
    if (brandList.length > 0) {
      const data = brandList.map((item) => {
        return item.name;
      });
      setBrandData(data);
    }
  }, []);

  useEffect(() => {
    if (serviceList.length > 0) {
      serviceList.map((item) => {
        if (item.name === parentService) {
          setServiceProvidedList(item.service_provided);
        }
      });
    }
  }, [parentService]);

  useEffect(() => {
    serviceProvidedList.map((item) => {
      if (item.name === serviceProvided) {
        setServiceType(item.serviceType);
      }
    });
  }, [serviceProvided]);

  const handleEngineerSearch = async (event, value) => {
    setIsEngineerLoading(true);
    const response = await getUserListBySearch({
      searchTerm: value,
      isTypeCustomer: false,
    });
    if (response?.data?.success) {
      setIsEngineerLoading(false);
      const userList = response?.data?.data?.rows.map((user) => {
        return {
          label: Helper.transformUserName(user),
          type: user.role,
          ...user,
        };
      });
      setEngineerList(userList);
    } else {
      setIsEngineerLoading(false);
      // dispatch(
      //   SET_SNACKBAR({
      //     open: true,
      //     message: "Technical Error",
      //     variant: "error",
      //   })
      // );
    }
  };

  const handleEngineerSelect = (e) => {
    engineerList.map((engineer) => {
      if (engineer.label === e.target.value) {
        setEngineerName(e.target.value);
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
          <CardHeader title={forEdit ? "Edit Ticket": "New Ticket"}></CardHeader>
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
                    <Controller
                      name="customer"
                      control={control}
                      render={({
                        field: { onChange, value, name },
                        fieldState: { error },
                      }) => (
                        <Autocomplete
                          id="customer"
                          options={customerList}
                          size="small"
                          onSelect={(e) => handleCustomerSelect(e)}
                          noOptionsText="No Customer Found"
                          value={value}
                          onChange={(event, value) => onChange(value)}
                          onInputChange={(event, value) =>
                            handleCustomerSearch(event, value)
                          }
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
                              error={!!error}
                              helperText={error?.message}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {isCustomerLoading ? (
                                      <CircularProgress
                                        color="primary"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </>
                                ),
                              }}
                            />
                          )}
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
                    {/* <Typography variant="subtitle1" gutterBottom align='center'>
                  Registration Date: {defaultUserDetail?.date_of_registration
                          ? moment(
                              defaultUserDetail?.date_of_registration
                            ).format("DD/MM/YYYY")
                          : "-"}
                  </Typography> */}
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
                      id="Contact Person Number"
                      value={
                        defaultUserDetail?.contact_person_number
                          ? defaultUserDetail?.contact_person_number
                          : "-"
                      }
                      size="small"
                      fullWidth
                      label="Contact Person Number"
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
                      name="parent_service"
                      control={control}
                      render={({
                        field: { onChange, value, name },
                        fieldState: { error },
                      }) => (
                        <Autocomplete
                          options={parentServiceList}
                          size="small"
                          id="auto-complete"
                          autoComplete
                          value={value}
                          onChange={(event, value) => onChange(value)}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!error}
                              helperText={error?.message}
                              label="Parent Service"
                              variant="outlined"
                            />
                          )}
                        />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "Parent Service is required.",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="service_provided"
                      control={control}
                      render={({
                        field: { onChange, value, name },
                        fieldState: { error },
                      }) => (
                        <Autocomplete
                          options={serviceProvidedList.map((item) => item.name)}
                          size="small"
                          id="auto-complete"
                          autoComplete
                          value={value}
                          onChange={(event, value) => onChange(value)}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!error}
                              helperText={error?.message}
                              label="Service Provide"
                              variant="outlined"
                            />
                          )}
                        />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "Service Provide is required.",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {serviceProvided && (
                      <Controller
                        name="service_type"
                        control={control}
                        render={({
                          field: { onChange, value, name },
                          fieldState: { error },
                        }) => (
                          <FormControl error={error}>
                            <RadioGroup
                              row
                              aria-labelledby="demo-error-radios"
                              name="row-radio-buttons-group"
                              value={value}
                              onChange={(event, value) => onChange(value)}
                            >
                              {Object.keys(serviceType).map(
                                (type) =>
                                  serviceType[type] && (
                                    <FormControlLabel
                                      value={type}
                                      control={<Radio />}
                                      label={type}
                                    />
                                  )
                              )}
                            </RadioGroup>
                            <FormHelperText>{error?.message}</FormHelperText>
                          </FormControl>
                        )}
                        rules={{
                          required: {
                            value: true,
                            message: "Service Type is required.",
                          },
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="brand"
                      control={control}
                      render={({
                        field: { onChange, value, name },
                        fieldState: { error },
                      }) => (
                        <Autocomplete
                          options={brandData}
                          size="small"
                          id="auto-complete"
                          autoComplete
                          value={value}
                          onChange={(event, value) => onChange(value)}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!error}
                              helperText={error?.message}
                              label="Brand"
                              variant="outlined"
                            />
                          )}
                        />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "Brand is required.",
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
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="serial_number"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="Serial Number"
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
                    <Controller
                      name="model_number"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="model_number"
                          onChange={onChange}
                          value={value}
                          type="text"
                          size="small"
                          fullWidth
                          label="Model Number"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={4} xs={6} md={8}>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="description"
                          onChange={onChange}
                          value={value}
                          type="text"
                          size="small"
                          fullWidth
                          label="Description"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={4} xs={6} md={8}>
                    <Controller
                      name="remark"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="remark"
                          onChange={onChange}
                          value={value}
                          type="text"
                          size="small"
                          fullWidth
                          label="Remark"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="engineer"
                      control={control}
                      render={({
                        field: { onChange, value, name },
                        fieldState: { error },
                      }) => (
                        <Autocomplete
                          id="engineer"
                          options={engineerList}
                          size="small"
                          onSelect={(e) => handleEngineerSelect(e)}
                          noOptionsText="No Engineer Found"
                          fullWidth
                          value={value}
                          onChange={(event, value) => onChange(value)}
                          onInputChange={(event, value) =>
                            handleEngineerSearch(event, value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Assign Engineer"
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {isEngineerLoading ? (
                                      <CircularProgress
                                        color="primary"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </>
                                ),
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={4} xs={6} md={12}>
                    <Controller
                      name="address.visit_address"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="visit_address"
                          onChange={onChange}
                          value={value}
                          type="text"
                          size="small"
                          fullWidth
                          label="Visit Address"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="address.visit_city"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="visit_city"
                          onChange={onChange}
                          value={value}
                          type="text"
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
                      name="address.visit_state"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="visit_state"
                          onChange={onChange}
                          value={value}
                          type="text"
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
                      name="address.visit_pincode"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="visit_pincode"
                          onChange={onChange}
                          value={value}
                          type="text"
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

export default NewTicket;

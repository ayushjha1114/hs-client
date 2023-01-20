import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Divider,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import {
  useGetAllTicketQuery,
  useCreateTicketMutation,
} from "../../services/admin";
import { notification } from "antd";
import Helper from "../../util/helper";

export default function TicketModal(props) {
  const { show, onHide, forEdit, forView, mobile, closeEdit, closeView } =
    props;

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.admin.userList);
  const amcList = useSelector((state) => state.admin.amcList);
  const serviceList = useSelector((state) => state.admin.serviceList);
  const brandList = useSelector((state) => state.admin.brandList);

  const [createTicket] = useCreateTicketMutation();
  const { refetch } = useGetAllTicketQuery({ limit: 10, offset: 0});

  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState({});
  const [currentAddress, setCurrentAddress] = useState("");
  const [defaultUserDetail, setDefaultUserDetail] = useState({});
  const [customerList, setCustomerList] = useState([]);
  const [parentServiceList, setParentServiceList] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [serviceProvidedList, setServiceProvidedList] = useState([]);
  const [engineerList, setEngineerList] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  // const [file, setFile] = useState("");
  // const [fileName, setFileName] = useState("");
  const [visitAddress, setVisitAddress] = useState("");
  const [visitCity, setVisitCity] = useState("");
  const [visitState, setVisitState] = useState("");
  const [visitPincode, setVisitPincode] = useState("");

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
      case "customer":
        setData({ ...data, customer: event.target.value });
        userList.map((item) => {
          let combineList = {}; 
          if (Helper.transformUserName(item) === event.target.value) {
          let amcIndex = amcList.findIndex((amc) => amc.user_profile_id === item.id)
            if (amcIndex !== -1) {
                combineList = {...item, ...amcList[amcIndex]}
                setDefaultUserDetail(combineList);
              }
              else {
                combineList = {...item}
                setDefaultUserDetail(combineList);
              }
          }
        });
        break;
      case "parent_service":
        serviceList.map((item) => {
          if (item.name === event.target.value) {
            setServiceProvidedList(item.service_provided);
          }
        });
        setData({ ...data, parent_service: event.target.value });
        break;
      case "brand":
        setData({ ...data, brand: event.target.value });
        break;
      case "serial_number":
        setData({ ...data, serial_number: event.target.value });
        break;
      case "model_number":
        setData({ ...data, model_number: event.target.value });
        break;
      case "service_provided":
        setData({ ...data, service_provided: event.target.value });
        break;
      case "description":
        setData({ ...data, description: event.target.value });
        break;
      case "priority":
        setData({ ...data, priority: event.target.value });
        break;
      case "remark":
        setData({ ...data, remark: event.target.value });
        break;
      case "engineer":
        setData({ ...data, engineer: event.target.value });
        break;
      case "visit_address":
        setVisitAddress(event.target.value);
        break;
      case "visit_city":
        setData({ ...data, visit_city: event.target.value });
        break;
      case "visit_state":
        setData({ ...data, visit_state: event.target.value });
        break;
      case "visit_pincode":
        setData({ ...data, visit_pincode: event.target.value });
        break;
      default:
        console.log("nothing");
    }
  };

  const handleCheckBoxClicked = (event) => {
    if (event.target.checked) {
      setCurrentAddress(`${
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
      }`);
      setVisitAddress(defaultUserDetail?.current_address);
      setVisitCity(defaultUserDetail?.current_city);
      setVisitState(defaultUserDetail?.current_state);
      setVisitPincode(defaultUserDetail?.current_pincode);
    } else {
      setVisitAddress('');
      setVisitCity('');
      setVisitState('');
      setVisitPincode('');
    }
    setIsChecked((current) => !current);
  };

  const handleSubmit = async () => {
    if (!data.customer) {
      Helper.errorHandler("Error occurred", "Please select the customer name.");
    } else if (!data.parent_service) {
      errorHandler("Error occurred", "Please select the parent service.");
    } else if (!data.brand) {
      errorHandler("Error occurred", "Please select the brand.");
    } else if (!data.model_number) {
      errorHandler("Error occurred", "Please enter the model number.");
    } else {
      let address = "";
      if (
        visitAddress ||
        visitCity ||
        visitState ||
        visitPincode
      ) {
        address = `${visitAddress} ${visitCity} ${visitState} ${visitPincode}`;
      } else {
        address = currentAddress;
      }
      data.service_type = JSON.stringify(serviceType);
      data.customer_plan = defaultUserDetail.user_plan;
      let ticketData = {
        ...data,
        address,
        mobile: defaultUserDetail.mobile,
        email: defaultUserDetail.email,
      };
      const response = await createTicket(ticketData);
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: "Ticket Created Successfully !!",
          duration: 4,
          className: "notification-green",
        });
      } else {
        errorHandler(
          "Technical Error",
          "There may be some error occurred while processing the request. Please try after some time."
        );
      }
      setDefaultUserDetail({});
      refetch();
      onHide();
    }
  };

  useEffect(() => {
    if (userList.length > 0) {
      const data = userList
        .map((item) => {
          if (item.role === "USER" || item.role === "AMC") {
            return {
              label: Helper.transformUserName(item),
              email: item.email,
            };
          }
        })
        .filter((item) => item);
      setCustomerList(data);
      const engineerData = userList
        .map((item) => {
          if (item.role === "ENGINEER") {
            return { label: `${item.first_name} ${item.last_name}` };
          }
        })
        .filter((item) => item);
      setEngineerList(engineerData);
    }
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
  }, [forEdit, forView, show]);

  const handleCancel = () => {
    setData({});
    setDefaultUserDetail({});
    onHide();
    if (forEdit) {
      closeEdit();
    } else if (forView) {
      closeView();
    }
  };

  // const handleUploadFile = (e) => {
  //   setFile(e.target.files[0]);
  //   setFileName(e.target.files[0].name);
  // };

  const handleServiceType = (event, value) => {
    if (event.target.checked) {
      setServiceType([...serviceType, value]);
    } else {
      const modifiedType = serviceType
        .map((item) => {
          if (item !== value) {
            return item;
          }
        })
        .filter((item) => item);
      setServiceType(modifiedType);
    }
  };

  return (
    <div>
      <Dialog open={show} onClose={handleCancel} maxWidth="lg" fullWidth={true}>
        <DialogTitle className="registerModalTitle">New Ticket</DialogTitle>
        <DialogContent>
          <Divider />
          <div className="registerModalBody">
            <div className="registerModalBodyField">
              <Autocomplete
                options={customerList}
                sx={{ width: 500 }}
                id="auto-complete"
                autoComplete
                includeInputInList
                renderInput={(params) => (
                  <TextField {...params} label="Customer" variant="standard" />
                )}
                onSelect={(e) => handleChange(e, "customer")}
              />
              <FormControl variant="standard" sx={{ width: 580 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Parent Service
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "parent_service")}
                  label="Parent Service"
                >
                  {parentServiceList.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="registerModalBodyField">
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => handleServiceType(e, "ON-SITE")} />
                }
                label="ON-SITE"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => handleServiceType(e, "ONLINE")} />
                }
                label="ONLINE"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => handleServiceType(e, "PICK AND DROP")}
                  />
                }
                label="PICK AND DROP"
              />
            </div>
            {/* <FormControl style={{ marginTop: "10px" }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="ONSITE"
                onChange={(e) => handleChange(e, "service_type")}
              >
                <FormControlLabel
                  value="ONSITE"
                  control={<Radio />}
                  label="On site service"
                />
                <FormControlLabel
                  value="ONLINE"
                  control={<Radio />}
                  label="Online service"
                />
                <FormControlLabel
                  value="PICK AND DROP"
                  control={<Radio />}
                  label="Pickup drop service"
                />
              </RadioGroup>
            </FormControl> */}
            <div className="registerModalBodyField">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Brand
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "brand")}
                  label="Brand"
                >
                  {brandData.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                id="name"
                label="Serial Number"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "serial_number")}
              />
            </div>
            <div className="registerModalBodyField">
              <TextField
                margin="dense"
                id="name"
                label="Model number"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "model_number")}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Service Provide
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "service_provided")}
                  label="Service Provide"
                >
                  {serviceProvidedList.map((item) => (
                    <MenuItem key={item.label} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="registerModalBodyField">
              <TextField
                style={{ marginTop: "8px" }}
                disabled={forView}
                id="standard-textarea"
                label="Description"
                placeholder="Enter the Description"
                multiline
                maxRows={4}
                variant="standard"
                fullWidth
                onChange={(e) => handleChange(e, "description")}
                defaultValue={
                  forEdit || forView ? defaultData?.curreccnt_address : ""
                }
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "priority")}
                  label="Priority"
                  defaultValue={forEdit || forView ? defaultData?.type : ""}
                  disabled={forView}
                >
                  <MenuItem value="LOW">LOW</MenuItem>
                  <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                  <MenuItem value="HIGH">HIGH</MenuItem>
                  <MenuItem value="URGENT">URGENT</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="registerModalBody" style={{ marginTop: "10px" }}>
            <TextField
              disabled={forView}
              id="standard-textarea"
              label="Remark"
              placeholder="Enter the Remark"
              multiline
              maxRows={4}
              variant="standard"
              fullWidth
              onChange={(e) => handleChange(e, "remark")}
              defaultValue={
                forEdit || forView ? defaultData?.curxxrent_address : ""
              }
            />
            {forView && (
              <div className="registerModalBodyField">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Assign Engineer
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e) => handleChange(e, "engineer")}
                    label="Assign Engineer"
                  >
                    {engineerList.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField
                  disabled
                  margin="dense"
                  id="name"
                  label="Date"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={
                    Date.now()
                  }
                /> */}
              </div>
            )}
            <div className="registerModalBodyField">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Assign Engineer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "engineer")}
                  label="Assign Engineer"
                >
                  {engineerList.map((item) => (
                    <MenuItem key={item.label} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                disabled
                margin="dense"
                id="mobile"
                label="Mobile"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={defaultUserDetail?.mobile}
              />
              <TextField
                disabled
                margin="dense"
                id="email"
                label="Email"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={defaultUserDetail?.email}
              />
            </div>
            <TextField
              disabled
              margin="dense"
              id="name"
              label="Current Address"
              type="text"
              fullWidth
              variant="standard"
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
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={isChecked}
                  onChange={(e) => handleCheckBoxClicked(e)}
                />
              }
              label="Visit address same as Current address"
            />
            <TextField
              margin="dense"
              id="name"
              label="Visit Address"
              type="text"
              fullWidth
              className="ticketVisitAddress"
              variant="standard"
              onChange={(e) => handleChange(e, "visit_address")}
              value={visitAddress}
            />
            <div className="registerModalBodyField">
              <TextField
                margin="dense"
                id="name"
                label="Visit City"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "visit_city")}
                value={visitCity}
              />
              <TextField
                margin="dense"
                id="name"
                label="Visit State"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "visit_state")}
                value={visitState}
              />
              <TextField
                margin="dense"
                id="name"
                label="Visit Pincode"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "visit_pincode")}
                value={visitPincode}
              />
            </div>
            {/* <div className="registerModalBodyField">
              <DialogContentText className="ticketModalAttachmentText">
                Attachment:
              </DialogContentText>
              <Button
                variant="contained"
                component="label"
                className="ticketUploadBtn"
              >
                Upload
                <input hidden accept="image/*" multiple type="file"  onChange={(e) => handleUploadFile(e)}/>
              </Button>
              <span className="ticketFileNameSpan">{fileName}</span>
            </div> */}
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

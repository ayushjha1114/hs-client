import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { FormControlLabel, Checkbox } from "@mui/material";
import {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useUpdateServiceDetailMutation,
} from "../../services/admin";
import { PlusCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { notification } from "antd";

export default function NewServiceModal(props) {
  const { show, onHide, isEdit, closeEdit, serviceId } = props;

  const serviceList = useSelector((state) => state.admin.serviceList);
  const { refetch } = useGetAllServiceQuery();
  const [createService] = useCreateServiceMutation();
  const [updateServiceDetail] = useUpdateServiceDetailMutation();

  let [serviceProvided, setServiceProvided] = useState({
    totalRows: 1,
    rows: [1],
    serviceProvidedData: [],
  });
  const [data, setData] = useState({});
  const [serviceType, setServiceType] = useState([]);
  let [defaultServiceProvided, setDefaultServiceProvided] = useState([]);

  const [serviceProvidedLabel, setServiceProvidedLabel] = useState("");
  const [serviceProvidedDescription, setServiceProvidedDescription] =
    useState("");
  const [defaultData, setDefaultData] = useState({});

  const [defaultOnSite, setDefaultOnSite] = useState(false);
  const [defaultOnline, setDefaultOnline] = useState(false);
  const [defaultPickDrop, setDefaultPickDrop] = useState(false);
  const [defaultOnSiteChecked, setDefaultOnSiteChecked] = useState(false);
  const [defaultOnlineChecked, setDefaultOnlineChecked] = useState(false);
  const [defaultPickDropChecked, setDefaultPickDropChecked] = useState(false);

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

  const handleCancel = () => {
    setDefaultOnline(false);
    setDefaultOnSite(false);
    setDefaultPickDrop(false);
    setServiceProvided({ totalRows: 1, rows: [1], serviceProvidedData: [] });
    setServiceProvidedLabel("");
    setServiceProvidedDescription("");
    onHide();
    closeEdit();
  };

  useEffect(() => {
    if (serviceList.length > 0 && isEdit) {
      serviceList.map((item) => {
        if (item.id === serviceId) {
          let serviceProvidedLength = item?.service_provided?.length;
          let newArr = [];
          let i = 0;
          while (i !== serviceProvidedLength) {
            newArr.push(i + 1);
            i++;
          }
          item.service_type.map((element) => {
            if (element === "ONLINE") {
              setDefaultOnline(true);
            } else if (element === "ON-SITE") {
              setDefaultOnSite(true);
            } else if (element === "PICK AND DROP") {
              setDefaultPickDrop(true);
            }
          });

          setDefaultServiceProvided(item.service_provided);
          setServiceProvided({
            totalRows: serviceProvidedLength,
            rows: newArr,
            serviceProvidedData: item.service_provided,
          });
          setServiceProvidedLabel(
            item.service_provided[serviceProvidedLength - 1].label
          );
          setServiceProvidedDescription(
            item.service_provided[serviceProvidedLength - 1].description
          );
          setServiceType(item.service_type);
          setDefaultData(item);
        }
      });
    }
  }, [isEdit, show]);

  const handleChange = (event, field) => {
    switch (field) {
      case "name":
        setData({ ...data, name: event.target.value });
        break;
      case "description":
        setData({ ...data, description: event.target.value });
        break;
      case "label":
        setServiceProvidedLabel(event.target.value);
        break;
      case "service_provided_description":
        setServiceProvidedDescription(event.target.value);
        break;
      default:
        console.log("nothing");
    }
  };

  const handleAddBtn = (count) => {
    if (!serviceProvidedLabel) {
      errorHandler(
        "Error occurred",
        "Please enter the service provided label."
      );
    } else if (!serviceProvidedDescription) {
      errorHandler(
        "Error occurred",
        "Please enter the service provided description."
      );
    } else {
      const totalCount = serviceProvided.totalRows;
      if (isEdit) {
        let modifiedData = defaultServiceProvided
          .map((item) => {
            if (item.label !== serviceProvidedLabel) {
              return item;
            }
          })
          .filter((ele) => ele);
        setServiceProvided({
          totalRows: totalCount + 1,
          rows: [...serviceProvided.rows, totalCount + 1],
          serviceProvidedData: [
            ...modifiedData,
            {
              label: serviceProvidedLabel,
              description: serviceProvidedDescription,
            },
          ],
        });
        setDefaultServiceProvided([
          ...modifiedData,
          {
            label: serviceProvidedLabel,
            description: serviceProvidedDescription,
          },
        ]);
      } else {
        setServiceProvided({
          totalRows: totalCount + 1,
          rows: [...serviceProvided.rows, totalCount + 1],
          serviceProvidedData: [
            ...serviceProvided.serviceProvidedData,
            {
              label: serviceProvidedLabel,
              description: serviceProvidedDescription,
            },
          ],
        });
      }
      setServiceProvidedLabel("");
      setServiceProvidedDescription("");
    }
  };

  const handleServiceType = (event, value) => {
    if (value === "ONLINE") {
      setDefaultOnlineChecked(!defaultOnlineChecked);
      setDefaultOnline(!defaultOnline);
    } else if (value === "ON-SITE") {
      setDefaultOnSiteChecked(!defaultOnSiteChecked);
      setDefaultOnSite(!defaultOnSite);
    } else if (value === "PICK AND DROP") {
      setDefaultPickDropChecked(!defaultPickDropChecked);
      setDefaultPickDrop(!defaultPickDrop);
    }
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

  const handleSubmit = async () => {
    if (isEdit) {
      let serviceData = {};
      serviceData.name = data.name;
      serviceData.description = data.description;
      if (serviceType.length > 0) {
        serviceData.service_type = JSON.stringify(serviceType);
      }
      if (serviceProvided.serviceProvidedData.length > 0) {
        serviceData.service_provided = serviceProvided.serviceProvidedData;
      }
      const response = await updateServiceDetail({
        ...serviceData,
        id: serviceId,
      });
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: "Service Update Successfully !!",
          duration: 4,
          className: "notification-green",
        });
        setServiceType([]);
        refetch();
        onHide();
      } else {
        errorHandler(
          "Technical Error",
          "There may be some error occurred while processing the request. Please try after some time."
        );
      }
    } else {
      if (!data.name) {
        errorHandler("Error occurred", "Please enter the service name.");
      } else if (!data.description) {
        errorHandler("Error occurred", "Please enter the service description.");
      } else if (serviceType.length === 0) {
        errorHandler("Error occurred", "Please select the service type.");
      } else {
        let serviceData = {};
        serviceData.name = data.name;
        serviceData.description = data.description;
        serviceData.service_type = JSON.stringify(serviceType);
        serviceData.service_provided = serviceProvided.serviceProvidedData;

        const response = await createService(serviceData);

        if (response?.data?.success) {
          notification.success({
            message: "Success",
            description: "Service Created Successfully !!",
            duration: 4,
            className: "notification-green",
          });
          refetch();
          onHide();
        } else {
          errorHandler(
            "Technical Error",
            "There may be some error occurred while processing the request. Please try after some time."
          );
        }
      }
    }
  };

  const handleRemoveServiceProvided = (index) => {
    const indexedValue = serviceProvided.serviceProvidedData[index - 1];
    const newArr = serviceProvided.serviceProvidedData
      .map((item) => {
        if (item.label !== indexedValue.label) {
          // document.getElementById(`label ${item.label}`).value = 'dsdfsdf lund';
          // console.log("🚀 ~ file: NewServiceModal.js:286 ~ .map ~ document.getElementById(`label ${item.label}`)", document.getElementById(`label ${item.label}`))
          return item;
        }
      })
      .filter((item) => item);
    serviceProvided.rows.pop();
    setServiceProvided({
      totalRows: serviceProvided.totalRows - 1,
      rows: serviceProvided.rows,
      serviceProvidedData: newArr,
    });
  };

  return (
    <div>
      <Dialog open={show} onClose={handleCancel} maxWidth="lg" fullWidth={true}>
        <DialogTitle className="registerModalTitle">
          {isEdit ? "Edit Service" : "Create Service"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="registerModalContentText">
            Service Information
          </DialogContentText>
          <Divider />
          <div className="registerModalBody">
            <div className="registerModalBodyField">
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={isEdit ? defaultData?.name : ""}
                onChange={(e) => handleChange(e, "name")}
              />
            </div>
            <div className="registerModalBodyField">
              <DialogContentText className="serviceModalServiceTypeText">
                Service Type:
              </DialogContentText>
              <FormControlLabel
                control={
                  isEdit ? (
                    <Checkbox
                      // checked={defaultOnSite || defaultOnSiteChecked}
                      checked={defaultOnSite}
                      onChange={(e) => handleServiceType(e, "ON-SITE")}
                    />
                  ) : (
                    <Checkbox
                      // checked={defaultOnSite}
                      onChange={(e) => handleServiceType(e, "ON-SITE")}
                    />
                  )
                }
                label="ON-SITE"
              />
              <FormControlLabel
                control={
                  isEdit ? (
                    <Checkbox
                      // checked={defaultOnline || defaultOnlineChecked}
                      checked={defaultOnline}
                      onChange={(e) => handleServiceType(e, "ONLINE")}
                    />
                  ) : (
                    <Checkbox
                      // checked={(!isEdit && defaultOnline) || (isEdit && defaultOnlineChecked)}
                      onChange={(e) => handleServiceType(e, "ONLINE")}
                    />
                  )
                }
                label="ONLINE"
              />
              <FormControlLabel
                control={
                  isEdit ? (
                    <Checkbox
                      // checked={defaultPickDrop || defaultPickDropChecked}
                      checked={defaultPickDrop}
                      onChange={(e) => handleServiceType(e, "PICK AND DROP")}
                    />
                  ) : (
                    <Checkbox
                      // checked={defaultPickDrop || (isEdit && defaultPickDropChecked)}
                      onChange={(e) => handleServiceType(e, "PICK AND DROP")}
                    />
                  )
                }
                label="PICK AND DROP"
              />
            </div>
            <div className="registerModalBodyField">
              <TextField
                id="standard-textarea"
                label="Description"
                placeholder="Enter the description"
                multiline
                maxRows={4}
                variant="standard"
                fullWidth
                onChange={(e) => handleChange(e, "description")}
                defaultValue={isEdit ? defaultData?.description : ""}
              />
            </div>
            {serviceProvided.rows.map((item, key) => (
              <div className="registerModalBodyField">
                <DialogContentText className="serviceModalServiceProvidedText">
                  Service Provide:
                </DialogContentText>
                <TextField
                  required
                  margin="dense"
                  id='label'
                  // id={`label ${defaultData?.service_provided[key]?.label}`}
                  label="Label"
                  type="text"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={
                    isEdit
                      ? defaultData?.service_provided
                        ? defaultData?.service_provided[key]?.label
                        : ""
                      : ""
                  }
                  onChange={(e) => handleChange(e, "label")}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={
                    isEdit
                      ? defaultData?.service_provided
                        ? defaultData?.service_provided[key]?.description
                        : ""
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(e, "service_provided_description")
                  }
                />

                {serviceProvided.totalRows !== item && (
                  <a
                    className="serviceModalAddBtn"
                    onClick={() => handleRemoveServiceProvided(item)}
                  >
                    <CloseCircleTwoTone />
                  </a>
                )}
                {serviceProvided.totalRows === item && (
                  <a
                    className="serviceModalAddBtn"
                    onClick={() => handleAddBtn(item)}
                  >
                    <PlusCircleTwoTone />
                  </a>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="registerModalBtn" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button className="registerModalBtn" onClick={() => handleSubmit()}>
            {isEdit ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

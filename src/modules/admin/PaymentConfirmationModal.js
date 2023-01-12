import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  useGetAllPaymentDetailQuery,
  useSavePaymentDetailMutation,
  useUpdatePaymentDetailMutation,
  useGetAllTicketQuery
} from "../../services/admin";
import { notification } from "antd";
import Helper from "../../util/helper";

export default function PaymentConfirmationModal(props) {
  const { show, onHide, ticketId, isEdit, closeEdit } = props;

  const paymentDetailList = useSelector((state) => state.admin.paymentDetailList);
  const [savePaymentDetail] = useSavePaymentDetailMutation();
  const [updatePaymentDetail] = useUpdatePaymentDetailMutation();
  const { refetch } = useGetAllPaymentDetailQuery();
  const { refetch: refetchAllTicket } = useGetAllTicketQuery();

  const [data, setData] = useState({});
  const [defaultData, setDefaultData] = useState({});

  const handleChange = (event, field) => {
    switch (field) {
      case "invoice_number":
        setData({ ...data, invoice_number: event.target.value });

        break;
      case "invoice_amount":
        setData({ ...data, invoice_amount: event.target.value });
        break;
      case "invoice_date":
        setData({ ...data, invoice_date: event.target.value });
        break;
      case "remark":
        setData({ ...data, remark: event.target.value });
        break;
      case "payment_status":
        setData({ ...data, payment_status: event.target.value });
        break;
      default:
        console.log("nothing");
    }
  };

  const handleSubmit = async () => {
    if (isEdit) {
      const response = await updatePaymentDetail({
        ...data,
        id: ticketId,
      });
      console.log("🚀 ~ file: PaymentConfirmationModal.js:75 ~ handleSubmit ~ response", response)
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: "Payment detail Update Successfully !!",
          duration: 4,
          className: "notification-green",
        });
      } else {
        Helper.errorHandler(
          "Technical Error",
          "There may be some error occurred while processing the request. Please try after some time."
        );
      }
      refetch();
      refetchAllTicket();
      onHide();

    } else {

      if (!data.invoice_number) {
        Helper.errorHandler("Error occurred", "Please enter the invoice number.");
      } else if (!data.invoice_amount) {
        Helper.errorHandler("Error occurred", "Please enter the invoice amount.");
      } else if (!/^\d+$/.test(data.invoice_amount)) {
        Helper.errorHandler("Error occurred", "Please enter the valid invoice amount.");
      } else if (!data.invoice_date) {
        Helper.errorHandler("Error occurred", "Please enter the invoice date.");
      } else if (!data.remark) {
        Helper.errorHandler("Error occurred", "Please enter the remark.");
      } else if (!data.payment_status) {
        Helper.errorHandler("Error occurred", "Please enter the payment status.");
      } else {
        console.log(
          "🚀 ~ file: PaymentConfirmationModal.js:69 ~ handleSubmit ~ data",
          data,
          ticketId
        );
  
        const response = await savePaymentDetail({
          ...data,
          ticket_id: ticketId,
        });
        console.log(
          "🚀 ~ file: TicketModal.js:200 ~ handleSubmit ~ response",
          response
        );
        if (response?.data?.success) {
          notification.success({
            message: "Success",
            description: "Payment detail Saved Successfully !!",
            duration: 4,
            className: "notification-green",
          });
        } else {
          Helper.errorHandler(
            "Technical Error",
            "There may be some error occurred while processing the request. Please try after some time."
          );
        }
        refetch();
        refetchAllTicket();
        onHide();
      }
    }
  };

  const handleCancel = () => {
    if(isEdit) {
      closeEdit();
    }
    onHide();
  };

  useEffect(() => {
    if (paymentDetailList.length > 0) {
      console.log("🚀 ~ file: PaymentConfirmationModal.js:122 ~ data ~ ticketId", ticketId)
      paymentDetailList.map((item) => {
        if (item.ticket_id === ticketId) {
          setDefaultData(item);
        }
      });
    }
  }, [isEdit]);

  return (
    <div>
      <Dialog open={show} onClose={onHide} maxWidth="lg" fullWidth={true}>
        <DialogTitle className="registerModalTitle">
          {isEdit ? 'Edit ' : ''}Payment Details
        </DialogTitle>
        <DialogContent>
          <Divider />
          <div className="registerModalBody">
            <div className="registerModalBodyField">
              <TextField
                required
                margin="dense"
                id="name"
                label="Invoice Number"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "invoice_number")}
                defaultValue={
                  isEdit ? defaultData?.invoice_number : ""
                }
              />
            </div>
            <div
              className="registerModalBodyField"
              style={{ marginTop: "10px" }}
            >
              <TextField
                required
                margin="dense"
                id="name"
                label="Invoice Amount"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "invoice_amount")}
                defaultValue={
                  isEdit ? defaultData?.invoice_amount : ""
                }
              />
              <TextField
                id="date"
                label="Invoice Date"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleChange(e, "invoice_date")}
                defaultValue={
                  isEdit ? defaultData?.invoice_date : ""
                }
              />
            </div>
            <div
              className="registerModalBodyField"
              style={{ marginTop: "5px" }}
            >
              <TextField
                id="standard-textarea"
                label="Remark"
                placeholder="Enter the Remark"
                multiline
                maxRows={4}
                variant="standard"
                fullWidth
                onChange={(e) => handleChange(e, "remark")}
                defaultValue={
                  isEdit ? defaultData?.remark : ""
                }
              />
              <FormControl variant="standard" sx={{ width: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Payment Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => handleChange(e, "payment_status")}
                  label="Payment Status"
                  defaultValue={
                    isEdit ? defaultData?.payment_status : ""
                  }
                >
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Unpaid">Unpaid</MenuItem>
                  <MenuItem value="AMC">AMC</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="registerModalBtn" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button className="registerModalBtn" onClick={() => handleSubmit()}>
            {isEdit ? 'Edit': 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

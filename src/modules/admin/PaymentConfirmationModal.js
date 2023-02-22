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
  useGetAllTicketQuery,
} from "../../services/admin";
import { notification } from "antd";
import Helper from "../../util/helper";
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";

export default function PaymentConfirmationModal(props) {
  const dispatch = useDispatch();
  const { show, onHide, ticketId, isEdit, closeEdit } = props;

  const paymentDetailList = useSelector(
    (state) => state.admin.paymentDetailList
  );
  const [savePaymentDetail] = useSavePaymentDetailMutation();
  const [updatePaymentDetail] = useUpdatePaymentDetailMutation();
  const { refetch } = useGetAllPaymentDetailQuery({ limit: 10, offset: 0 });
  const { refetch: refetchAllTicket } = useGetAllTicketQuery({
    limit: 10,
    offset: 0,
  });

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
      dispatch(SET_LOADING({ data: true }));
      const response = await updatePaymentDetail({
        ...data,
        id: ticketId,
      });
      if (response?.data?.success) {
        dispatch(SET_LOADING({ data: false }));
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Payment detail Update Successfully !",
            variant: "success",
          })
        );
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
      refetch();
      refetchAllTicket();
      onHide();
    } else {
      if (!data.invoice_number) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Please enter the invoice number.",
            variant: "error",
          })
        );
      } else if (!data.invoice_amount) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Please enter the invoice amount.",
            variant: "error",
          })
        );
      } else if (!/^\d+$/.test(data.invoice_amount)) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Please enter the valid invoice amount.",
            variant: "error",
          })
        );
      } else if (!data.invoice_date) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Please enter the invoice date.",
            variant: "error",
          })
        );
      } else if (!data.remark) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Please enter the remark.",
            variant: "error",
          })
        );
      } else if (!data.payment_status) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Please enter the payment status.",
            variant: "error",
          })
        );
      } else {
        dispatch(SET_LOADING({ data: true }));
        const response = await savePaymentDetail({
          ...data,
          ticket_id: ticketId,
        });
        if (response?.data?.success) {
          dispatch(SET_LOADING({ data: false }));
          dispatch(
            SET_SNACKBAR({
              open: true,
              message: "Payment detail Saved Successfully !",
              variant: "success",
            })
          );
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
        refetch();
        refetchAllTicket();
        onHide();
      }
    }
  };

  const handleCancel = () => {
    if (isEdit) {
      closeEdit();
    }
    onHide();
  };

  useEffect(() => {
    if (paymentDetailList.length > 0) {
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
          {isEdit ? "Edit " : ""}Payment Details
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
                defaultValue={isEdit ? defaultData?.invoice_number : ""}
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
                defaultValue={isEdit ? defaultData?.invoice_amount : ""}
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
                defaultValue={isEdit ? defaultData?.invoice_date : ""}
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
                defaultValue={isEdit ? defaultData?.remark : ""}
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
                  defaultValue={isEdit ? defaultData?.payment_status : ""}
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
            {isEdit ? "Edit" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

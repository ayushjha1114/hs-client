import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Helper from "../../util/helper";

export default function TicketViewModal(props) {
  const { show, onHide, data } = props;
  const [defaultUserDetail, setDefaultUserDetail] = useState({});
  const [isOnsite, setIsOnsite] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isPickDrop, setIsPickDrop] = useState(false);

  const userList = useSelector((state) => state.admin.userList);
  useEffect(() => {
    userList.map((item) => {
      if (Helper.transformUserName(item) === data.customer) {
        setDefaultUserDetail(item);
      }
    });
    if (Object.keys(data).length > 0) {
      JSON.parse(data?.service_type).map((type) => {
        if (type === "ON-SITE") {
          setIsOnsite(true);
        } else if (type === "ONLINE") {
          setIsOnline(true);
        } else if (type === "PICK AND DROP") {
          setIsPickDrop(true);
        }
      });
    }
  }, [show]);

  const handleCancel = () => {
    setIsOnsite(false);
    setIsOnline(false);
    setIsPickDrop(false);
    onHide();
  };

  return (
    <div>
      <Dialog open={show} onClose={handleCancel} maxWidth="lg" fullWidth={true}>
        <DialogTitle className="registerModalTitle">View Ticket</DialogTitle>
        <DialogContent>
          <Divider />
          <div className="registerModalBody">
            <div className="registerModalBodyField">
              <TextField
                disabled
                margin="dense"
                id="mobile"
                label="Customer"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data?.customer}
              />
              <TextField
                disabled
                margin="dense"
                id="mobile"
                label="Parent Service"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data?.parent_service}
              />
            </div>
            <div className="registerModalBodyField">
              <FormControlLabel
                control={<Checkbox checked={isOnsite} disabled />}
                label="ON-SITE"
              />
              <FormControlLabel
                control={<Checkbox checked={isOnline} disabled />}
                label="ONLINE"
              />
              <FormControlLabel
                control={<Checkbox checked={isPickDrop} disabled />}
                label="PICK AND DROP"
              />
            </div>
            <div className="registerModalBodyField">
              <TextField
                disabled
                margin="dense"
                id="mobile"
                label="Brand"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data?.brand}
              />
              <TextField
                disabled
                margin="dense"
                id="name"
                label="Serial Number"
                type="text"
                fullWidth
                variant="standard"
                value={data?.serial_number}
              />
            </div>
            <div className="registerModalBodyField">
              <TextField
                disabled
                margin="dense"
                id="name"
                label="Model number"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data?.model_number}
              />
              <TextField
                disabled
                margin="dense"
                id="mobile"
                label="Service Provide"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data?.service_provided}
              />
            </div>
            <div className="registerModalBodyField">
              <TextField
                style={{ marginTop: "8px" }}
                disabled
                id="standard-textarea"
                label="Description"
                variant="standard"
                fullWidth
                value={data?.description}
              />
              <TextField
                disabled
                margin="dense"
                id="mobile"
                label="Priority"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data?.priority}
              />
            </div>
          </div>
          <div className="registerModalBody" style={{ marginTop: "5px" }}>
            <div className="registerModalBodyField">
              <TextField
                disabled
                margin="dense"
                id="mobile"
                label="Ticket Number"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data?.ticket_number}
              />
              <TextField
                disabled
                margin="dense"
                id="name"
                label="Date of creation"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data?.date}
              />
            </div>
          </div>
          <div className="registerModalBody" style={{ marginTop: "5px" }}>
            <div className="registerModalBodyField">
              <TextField
                disabled
                id="remark"
                label="Remark"
                variant="standard"
                fullWidth
                value={data?.remark}
              />
              <TextField
                disabled
                margin="dense"
                id="mobile"
                label="Engineer"
                type="text"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data?.engineer}
              />
            </div>
          </div>
          <div className="registerModalBody" style={{ marginTop: "8px" }}>
            <div className="registerModalBodyField">
              {data?.payment_status && (
                <>
                  <TextField
                    disabled
                    id="remark"
                    label="Invoice Number"
                    variant="standard"
                    fullWidth
                    value={data?.invoice_number}
                  />
                  <TextField
                    disabled
                    id="name"
                    label="Invoice Amount"
                    type="text"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data?.invoice_amount}
                  />
                  <TextField
                    disabled
                    id="name"
                    label="Invoice Date"
                    type="text"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data?.invoice_date}
                  />
                </>
              )}
            </div>
          </div>
          <div className="registerModalBody" style={{ marginTop: "5px" }}>
            <div className="registerModalBodyField">
              {data?.payment_status && (
                <TextField
                  disabled
                  id="name"
                  label="Payment Status"
                  type="text"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={data?.payment_status}
                />
              )}
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
          </div>
          <div className="registerModalBody" style={{ marginTop: "5px" }}>
            <TextField
              disabled
              margin="dense"
              id="name"
              label="Visit Address"
              type="text"
              fullWidth
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              value={data?.address}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="registerModalBtn" onClick={() => handleCancel()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

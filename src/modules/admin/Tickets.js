import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Button, Tag } from "antd";
import UserLayout from "../../layout/User";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Check from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import TicketModal from "./TicketModal";
import PaymentConfirmationModal from "./PaymentConfirmationModal";
import {
  SET_USER_LIST,
  SET_SERVICE_LIST,
  SET_BRAND_LIST,
  SET_PAYMENT_DETAIL_LIST,
} from "./adminSlice";
import {
  useGetAllUserQuery,
  useGetAllServiceQuery,
  useGetAllBrandQuery,
  useGetAllTicketQuery,
  useGetAllPaymentDetailQuery,
  useUpdateTicketMutation
} from "../../services/admin";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import NorthIcon from "@mui/icons-material/North";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SouthIcon from "@mui/icons-material/South";
import { notification } from "antd";
import Helper from "../../util/helper";

const Tickets = () => {
  const dispatch = useDispatch();

  const { data: userData } = useGetAllUserQuery();
  const { data: serviceData } = useGetAllServiceQuery();
  const { data: brandData } = useGetAllBrandQuery();
  const { data: paymentData } = useGetAllPaymentDetailQuery();
  const { data, error, isLoading, refetch } = useGetAllTicketQuery();
  console.log("🚀 ~ file: Tickets.js:42 ~ Tickets ~ data", data)

  const [updateTicket] = useUpdateTicketMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [ticketModalShow, setTicketModalShow] = useState(false);
  const [priority, setPriority] = useState("");
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [forPaymentModalEdit, setForPaymentModalEdit] = useState(false);
  const [paymentUpdatedAtList, setPaymentUpdatedAtList] = useState([]);
  const [paymentStatusList, setPaymentStatusList] = useState([]);

  const open = Boolean(anchorEl);
  const handleClick = ({event, id, status, priority, statusColor}) => {
    setTicketId(id);
    setStatus(status);
    setPriority(priority);
    setStatusColor(statusColor)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePriority = async (prior) => {
    const response = await updateTicket({
      priority: prior,
      id: ticketId,
    });
    console.log("🚀 ~ file: Tickets.js:76 ~ handleStatus ~ response", response, ticketId)
    if (response?.data?.success) {
      notification.success({
        message: "Success",
        description: "Ticket Priority Updated Successfully !!",
        duration: 4,
        className: "notification-green",
      });
      refetch();
    } else {
      Helper.errorHandler(
        "Technical Error",
        "There may be some error occurred while processing the request. Please try after some time."
      );
    }
    setPriority(prior);
    handleClose();
  };

  const handleStatus = async (status, color) => {
    console.log("🚀 ~ file: Tickets.js:93 ~ handleStatus ~ color", color)
    if (status === "Closed") {
      setPaymentModalShow(true);
    } else {
      const response = await updateTicket({
        status,
        status_color: color,
        id: ticketId,
      });
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: "Ticket Status Updated Successfully !!",
          duration: 4,
          className: "notification-green",
        });
        refetch();
      } else {
        Helper.errorHandler(
          "Technical Error",
          "There may be some error occurred while processing the request. Please try after some time."
        );
      }
    }
    setStatusColor(color);
    handleClose();
  };

  const handleNewTicketBtn = () => {
    dispatch(SET_USER_LIST({ data: userData?.data?.rows }));
    dispatch(SET_BRAND_LIST({ data: brandData?.data?.rows }));
    dispatch(SET_SERVICE_LIST({ data: serviceData?.data?.rows }));
    setTicketModalShow(true);
  };

  const handlePaymentStatus = (ticketId) => {
    dispatch(SET_PAYMENT_DETAIL_LIST({ data: paymentData?.data?.rows }));
    setPaymentModalShow(true);
    setTicketId(ticketId);
    setForPaymentModalEdit(true);
  };

  useEffect(() => {
    if (data?.data?.rows?.length > 0) {
      dispatch(
        SET_PAYMENT_DETAIL_LIST({ data: data?.data?.paymentDetailList })
      );
      let refinedUpdatedAtList = [];
      let refinedPaymentStatusList = [];
      data.data.rows.map((item) => {
        const date = data.data.paymentDetailList
          .map((payment) => {
            if (payment.ticket_id === item.id) {
              return payment.updatedAt;
            }
          })
          .filter((item) => item);
        refinedUpdatedAtList.push(date[0]);
      });
      setPaymentUpdatedAtList(refinedUpdatedAtList);
      data.data.rows.map((item) => {
        const status = data.data.paymentDetailList
          .map((payment) => {
            if (payment.ticket_id === item.id) {
              return payment.payment_status;
            }
          })
          .filter((item) => item);
        refinedPaymentStatusList.push(status[0]);
      });
      setPaymentStatusList(refinedPaymentStatusList);
    }
  }, [isLoading]);

  return (
    <>
      <UserLayout>
        <div className="">
          <div className="user-management-card">
            <div className="ticket-heading">
              <h3>Tickets</h3>
              <Button
                className="new-ticket-btn"
                type="primary"
                ghost
                onClick={() => handleNewTicketBtn()}
              >
                New Ticket
              </Button>
            </div>
            {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data?.data && data?.data?.rows?.length > 0 ? (
              <>
                <h5>
                  {data?.data?.totalCount ? data?.data?.totalCount : 0} tickets
                </h5>
                <div className="user-management-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Ticket Number</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Engineer</th>
                        <th>Status</th>
                        <th>Payment Status</th>
                        <th>Last Modified</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data &&
                        data?.data?.rows?.length > 0 &&
                        data.data.rows.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.ticket_number}</td>
                              <td>{item.customer}</td>
                              <td>{item.parent_service}</td>
                              <td>{item.engineer}</td>
                              <td>
                                <Tag
                                  color={item.status_color || 'green'}
                                >
                                  {item.status}
                                </Tag>
                              </td>
                              <td>
                                {paymentStatusList[i]
                                  ? paymentStatusList[i]
                                  : "-"}
                              </td>
                              <td>
                                {paymentUpdatedAtList[i]
                                  ? moment(paymentUpdatedAtList[i]).fromNow()
                                  : "-"}
                              </td>

                              <td>
                                <a onClick={(e) => handleClick({event: e, id: item.id, status: item.status, priority: item.priority, statusColor: item.status_color})}>
                                  <i class="fa-solid fa-ellipsis"></i>
                                </a>
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                  }}
                                >
                                  <MenuItem
                                    disabled={status === 'Closed'}
                                    onClick={() => handlePriority("URGENT", item.status)}
                                  >
                                    {priority === "URGENT" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set priority to Urgent
                                    <KeyboardDoubleArrowUpIcon className="priority-color" />
                                  </MenuItem>
                                  <MenuItem
                                  disabled={status === 'Closed'}
                                    onClick={() => handlePriority("HIGH")}
                                  >
                                    {priority === "HIGH" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set priority to High{" "}
                                    <NorthIcon className="priority-color" />
                                  </MenuItem>
                                  <MenuItem
                                  disabled={status === 'Closed'}
                                    onClick={() => handlePriority("MEDIUM")}
                                  >
                                    {priority === "MEDIUM" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set priority to Medium
                                    <FiberManualRecordIcon className="priority-color" />
                                  </MenuItem>
                                  <MenuItem
                                  disabled={status === 'Closed'}
                                    onClick={() => handlePriority("LOW")}
                                  >
                                    {priority === "LOW" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set priority to Low{" "}
                                    <SouthIcon className="priority-color" />
                                  </MenuItem>
                                  <Divider />
                                  <MenuItem
                                  disabled={status === 'Closed'}
                                    onClick={() =>
                                      handleStatus("Open", "green")
                                    }
                                  >
                                    {statusColor === "green" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set as Open
                                  </MenuItem>
                                  <MenuItem
                                  disabled={status === 'Closed'}
                                    onClick={() =>
                                      handleStatus("Pending", "blue")
                                    }
                                  >
                                    {statusColor === "blue" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set as Pending
                                  </MenuItem>
                                  <MenuItem
                                  disabled={status === 'Closed'}
                                    onClick={() =>
                                      handleStatus("On Hold", "orange")
                                    }
                                  >
                                    {statusColor === "orange" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set as On hold
                                  </MenuItem>
                                  <MenuItem
                                  disabled={status === 'Closed'}
                                    onClick={() =>
                                      handleStatus("Closed", "red")
                                    }
                                  >
                                    {statusColor === "red" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set as Closed
                                  </MenuItem>
                                  <Divider />
                                  <MenuItem
                                    onClick={() => handlePaymentStatus(item.id)}
                                  >
                                    Payment Status
                                  </MenuItem>
                                </Menu>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <h2>No Tickets Found</h2>
              </>
            )}
          </div>
        </div>
        <TicketModal
          show={ticketModalShow}
          onHide={() => setTicketModalShow(false)}
        />
        <PaymentConfirmationModal
          show={paymentModalShow}
          ticketId={ticketId}
          onHide={() => setPaymentModalShow(false)}
          closeEdit={() => setForPaymentModalEdit(false)}
          isEdit={forPaymentModalEdit}
        />
      </UserLayout>
    </>
  );
};

export default Tickets;

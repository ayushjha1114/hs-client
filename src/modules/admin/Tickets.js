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
  SET_AMC_LIST
} from "./adminSlice";
import {
  useGetAllUserQuery,
  useGetAllServiceQuery,
  useGetAllBrandQuery,
  useGetAllTicketQuery,
  useGetAllPaymentDetailQuery,
  useUpdateTicketMutation,
} from "../../services/admin";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import NorthIcon from "@mui/icons-material/North";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SouthIcon from "@mui/icons-material/South";
import { notification } from "antd";
import Helper from "../../util/helper";
import { EyeTwoTone } from "@ant-design/icons";
import TicketViewModal from "./TicketViewModal";
import TablePagination from '@mui/material/TablePagination';

const Tickets = () => {
  const dispatch = useDispatch();

  const { data: userData } = useGetAllUserQuery({ limit: 10, offset: 0});
  const { data: serviceData } = useGetAllServiceQuery();
  const { data: brandData } = useGetAllBrandQuery({ limit: 10, offset: 0});
  
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
  const [ticketViewModalShow, setTicketViewModalShow] = useState(false);
  const [ticketDetailForView, setTicketDetailForView] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {
    data: paymentData,
    isLoading: isPaymentLoading,
    refetch: paymentRefetch,
  } = useGetAllPaymentDetailQuery({ limit: rowsPerPage, offset: page * rowsPerPage});
  
  const { data, error, isLoading, refetch } = useGetAllTicketQuery({ limit: rowsPerPage, offset: page * rowsPerPage});
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const open = Boolean(anchorEl);

  const handleClick = ({ event, id, status, priority, statusColor }) => {
    setTicketId(id);
    setStatus(status);
    setPriority(priority);
    setStatusColor(statusColor);
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
    if (response?.data?.success) {
      notification.success({
        message: "Success",
        description: "Ticket Priority Updated Successfully !!",
        duration: 4,
        className: "notification-green",
      });
      refetch();
      paymentRefetch();
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
    dispatch(SET_AMC_LIST({ data: userData?.data?.amcList }));
    dispatch(SET_BRAND_LIST({ data: brandData?.data?.rows }));
    dispatch(SET_SERVICE_LIST({ data: serviceData?.data?.rows }));
    setTicketModalShow(true);
  };

  const handlePaymentStatus = (ticketId, status) => {
    dispatch(SET_PAYMENT_DETAIL_LIST({ data: paymentData?.data?.rows }));
    setPaymentModalShow(true);
    if (status === 'Closed') {
      setTicketId(ticketId);
      setForPaymentModalEdit(true);
    }
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
  }, [isLoading, isPaymentLoading]);

  const handleViewBtn = (ticketData) => {
    dispatch(SET_USER_LIST({ data: userData?.data?.rows }));
    let final = { ...ticketData };
    data.data.paymentDetailList.map((payment) => {
      if (ticketData.id === payment.ticket_id) {
        final = { ...payment, ...ticketData };
      }
    });
    setTicketDetailForView(final);
    setTicketViewModalShow(true);
  };

  const changePriorityIcon = (priority) => {
    let priorityIcon = "";
    switch (priority) {
      case "URGENT":
        priorityIcon = (
          <div>
            <KeyboardDoubleArrowUpIcon className="priority-urgent" />
          </div>
        );
        break;
      case "HIGH":
        priorityIcon = (
          <div>
            <NorthIcon className="priority-high" />
          </div>
        );
        break;
      case "MEDIUM":
        priorityIcon = (
          <div>
            <FiberManualRecordIcon className="priority-medium" />
          </div>
        );
        break;
      default:
        priorityIcon = (
          <div>
            <SouthIcon className="priority-low" />
          </div>
        );
    }
    return priorityIcon;
  };

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
                        <th>User Plan</th>
                        <th>Service</th>
                        <th>Engineer</th>
                        <th>Status</th>
                        <th>Payment Status</th>
                        <th>Date</th>
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
                              <td className="ticketNumber">
                                {item.ticket_number}{" "}
                                {changePriorityIcon(item.priority)}
                              </td>
                              <td>{item.customer}</td>
                              <td>
                                {item.customer_plan
                                  ? item.customer_plan
                                  : '-'}
                              </td>
                              <td>{item.service_provided}</td>
                              <td>{item.engineer}</td>
                              <td>
                                <Tag color={item.status_color || "green"}>
                                  {item.status}
                                </Tag>
                              </td>
                              <td>
                                {paymentStatusList[i]
                                  ? paymentStatusList[i]
                                  : "-"}
                              </td>
                              <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                              <td>{moment(item.updatedAt).fromNow()}</td>

                              <td>
                                <a
                                  className="ticket-ellipsis-btn"
                                  onClick={(e) =>
                                    handleClick({
                                      event: e,
                                      id: item.id,
                                      status: item.status,
                                      priority: item.priority,
                                      statusColor: item.status_color,
                                    })
                                  }
                                >
                                  <i class="fa-solid fa-ellipsis"></i>
                                </a>
                                <a onClick={() => handleViewBtn(item)}>
                                  <EyeTwoTone />
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
                                    disabled={status === "Closed"}
                                    onClick={() =>
                                      handlePriority("URGENT", item.status)
                                    }
                                  >
                                    {priority === "URGENT" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set priority to Urgent
                                    <KeyboardDoubleArrowUpIcon className="priority-urgent" />
                                  </MenuItem>
                                  <MenuItem
                                    disabled={status === "Closed"}
                                    onClick={() => handlePriority("HIGH")}
                                  >
                                    {priority === "HIGH" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set priority to High{" "}
                                    <NorthIcon className="priority-high" />
                                  </MenuItem>
                                  <MenuItem
                                    disabled={status === "Closed"}
                                    onClick={() => handlePriority("MEDIUM")}
                                  >
                                    {priority === "MEDIUM" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set priority to Medium
                                    <FiberManualRecordIcon className="priority-medium" />
                                  </MenuItem>
                                  <MenuItem
                                    disabled={status === "Closed"}
                                    onClick={() => handlePriority("LOW")}
                                  >
                                    {priority === "LOW" && (
                                      <ListItemIcon>
                                        <Check />
                                      </ListItemIcon>
                                    )}
                                    Set priority to Low{" "}
                                    <SouthIcon className="priority-low" />
                                  </MenuItem>
                                  <Divider />
                                  <MenuItem
                                    disabled={status === "Closed"}
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
                                    disabled={status === "Closed"}
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
                                    disabled={status === "Closed"}
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
                                    disabled={status === "Closed"}
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
                                    disabled={status !== "Closed"}
                                    onClick={() => handlePaymentStatus(item.id, status)}
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
                <TablePagination
                  className="userManagementPagination"
                  component="div"
                  count={data?.data?.totalCount ? data?.data?.totalCount : 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
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
        <TicketViewModal
          show={ticketViewModalShow}
          data={ticketDetailForView}
          onHide={() => setTicketViewModalShow(false)}
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

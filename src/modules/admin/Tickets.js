import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Tag } from "antd";
import UserLayout from "../../layout/User";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Check from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import TicketModal from "./TicketModal";
import PaymentConfirmationModal from "./PaymentConfirmationModal";
import { Card, CardHeader, Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Helper from "../../util/helper";
import {
  SET_USER_LIST,
  SET_SERVICE_LIST,
  SET_BRAND_LIST,
  SET_PAYMENT_DETAIL_LIST,
  SET_AMC_LIST,
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
import TicketViewModal from "./TicketViewModal";
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";

const Tickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentDetailDataList = useSelector(
    (state) => state.admin.paymentDetailList
  );

  const { data: userData } = useGetAllUserQuery({
    limit: 99999999999,
    offset: 0,
  });
  const { data: serviceData } = useGetAllServiceQuery();
  const { data: brandData } = useGetAllBrandQuery({
    limit: 9999999999,
    offset: 0,
  });

  const [updateTicket] = useUpdateTicketMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [ticketModalShow, setTicketModalShow] = useState(false);
  const [priority, setPriority] = useState("");
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [forPaymentModalEdit, setForPaymentModalEdit] = useState(false);
  const [paymentStatusList, setPaymentStatusList] = useState([]);
  const [ticketViewModalShow, setTicketViewModalShow] = useState(false);
  const [ticketDetailForView, setTicketDetailForView] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {
    data: paymentData,
    isLoading: isPaymentLoading,
    refetch: paymentRefetch,
  } = useGetAllPaymentDetailQuery({
    limit: 9999999999999,
    offset: 0,
  });

  const { data, error, isLoading, refetch } = useGetAllTicketQuery({
    limit: 999999999999,
    offset: 0,
  });
  console.log("🚀 ~ file: Tickets.js:88 ~ Tickets ~ data:", data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const open = Boolean(anchorEl);

  const colorCombination = {
    green: "success",
    red: "default",
    orange: "warning",
    blue: "info",
  };

  useEffect(() => {
    refetch();
    paymentRefetch();
    if (data?.data?.rows?.length > 0) {
      let refinedPaymentStatusList = [];
      data.data.rows.map((item) => {
        const status = paymentDetailDataList
          .map((payment) => {
            if (payment.ticket_id === item.id) {
              return payment.payment_status;
            }
          })
          .filter((item) => item);
        refinedPaymentStatusList.push({ id: item.id, status: status });
      });
      setPaymentStatusList(refinedPaymentStatusList);
    }
  }, [paymentModalShow, forPaymentModalEdit]);

  useEffect(() => {
    refetch();
    paymentRefetch();
  }, []);

  useEffect(() => {
    if (isLoading) {
      dispatch(SET_LOADING({ data: true }));
    } else if (error) {
      dispatch(SET_LOADING({ data: false }));
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: "Technical Error",
          variant: "error",
        })
      );
    } else if (data) {
      dispatch(SET_LOADING({ data: false }));
    }
  }, [data, isLoading, error]);

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
    dispatch(SET_LOADING({ data: true }));
    const response = await updateTicket({
      priority: prior,
      id: ticketId,
    });
    if (response?.data?.success) {
      dispatch(SET_LOADING({ data: false }));
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: "Ticket Priority Updated Successfully !",
          variant: "success",
        })
      );
      refetch();
      paymentRefetch();
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
    setPriority(prior);
    handleClose();
  };

  const handleStatus = async (status, color) => {
    if (status === "Closed") {
      setPaymentModalShow(true);
    } else {
      dispatch(SET_LOADING({ data: true }));
      const response = await updateTicket({
        status,
        status_color: color,
        id: ticketId,
      });
      if (response?.data?.success) {
        dispatch(SET_LOADING({ data: false }));
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Ticket Status Updated Successfully !",
            variant: "success",
          })
        );
        refetch();
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
    setStatusColor(color);
    handleClose();
  };

  const handleNewTicketBtn = () => {
    dispatch(SET_USER_LIST({ data: userData?.data?.rows }));
    dispatch(SET_AMC_LIST({ data: userData?.data?.amcList }));
    dispatch(SET_BRAND_LIST({ data: brandData?.data?.rows }));
    dispatch(SET_SERVICE_LIST({ data: serviceData?.data?.rows }));
    navigate("/admin/new-ticket");
    // setTicketModalShow(true);
  };

  const handlePaymentStatus = (status) => {
    dispatch(SET_PAYMENT_DETAIL_LIST({ data: paymentData?.data?.rows }));
    setPaymentModalShow(true);
    if (status === "Closed") {
      setTicketId(ticketId);
      setForPaymentModalEdit(true);
    }
  };

  const modifiedTicketDataForEditView = (rowData) => {
    let modifiedTicketData = Object.assign({}, rowData);
    if (Helper.isJson(modifiedTicketData.address)) {
      modifiedTicketData.address = JSON.parse(modifiedTicketData.address);
    } else {
      modifiedTicketData.address = modifiedTicketData.address;
    }

    let final = { ...modifiedTicketData };
    data.data.paymentDetailList.map((payment) => {
      if (modifiedTicketData.id === payment.ticket_id) {
        final = {
          ...payment,
          ...modifiedTicketData,
          invoice_remark: payment.remark,
        };
      }
    });
    return final;
  };

  const handleEditBtn = useCallback((rowData) => () => {
    dispatch(SET_USER_LIST({ data: userData?.data?.rows }));
    dispatch(SET_AMC_LIST({ data: userData?.data?.amcList }));
    dispatch(SET_BRAND_LIST({ data: brandData?.data?.rows }));
    dispatch(SET_SERVICE_LIST({ data: serviceData?.data?.rows }));
    const modifiedDetail = modifiedTicketDataForEditView(rowData);
    setTicketDetailForView(modifiedDetail);
    navigate("/admin/new-ticket", {
      state: {
        forEdit: true,
        id: rowData.id,
        editData: modifiedDetail,
      },
    });
  });

  useEffect(() => {
    if (data?.data?.rows?.length > 0) {
      dispatch(
        SET_PAYMENT_DETAIL_LIST({ data: data?.data?.paymentDetailList })
      );
      let refinedPaymentStatusList = [];
      data.data.rows.map((item) => {
        const status = data.data.paymentDetailList
          .map((payment) => {
            if (payment.ticket_id === item.id) {
              return payment.payment_status;
            }
          })
          .filter((item) => item);
        refinedPaymentStatusList.push({ id: item.id, status: status });
      });
      setPaymentStatusList(refinedPaymentStatusList);
    }
  }, [isLoading, isPaymentLoading]);

  const handleViewBtn = (ticketData) => {
    dispatch(SET_USER_LIST({ data: userData?.data?.rows }));
    const modifiedDetail = modifiedTicketDataForEditView(ticketData);
    setTicketDetailForView(modifiedDetail);
    setTicketViewModalShow(true);
  };

  const getPaymentStatus = (id, paymentStatusList) => {
    let result = "-";
    paymentStatusList.map((payment) => {
      if (id === payment.id) {
        result = payment.status.length > 0 ? payment.status[0] : "-";
      }
    });
    return result;
  };

  const selectPaymentUpdatedAt = (paymentData, index) => {
    let result = "";
    paymentData.map((payment) => {
      if (payment.ticket_id === index) {
        result = payment.updatedAt;
      }
    });
    return result;
  };

  const changePriorityIcon = (priority, ticket_number) => {
    let priorityIcon = "";
    switch (priority) {
      case "URGENT":
        priorityIcon = (
          <div>
            {ticket_number}{" "}
            <KeyboardDoubleArrowUpIcon className="priority-urgent" />
          </div>
        );
        break;
      case "HIGH":
        priorityIcon = (
          <div>
            {ticket_number} <NorthIcon className="priority-high" />
          </div>
        );
        break;
      case "MEDIUM":
        priorityIcon = (
          <div>
            {ticket_number}{" "}
            <FiberManualRecordIcon className="priority-medium" />
          </div>
        );
        break;
      default:
        priorityIcon = (
          <div>
            {ticket_number} <SouthIcon className="priority-low" />
          </div>
        );
    }
    return priorityIcon;
  };

  const columns = React.useMemo(() => [
    {
      field: "ticket_number",
      headerName: "Ticket Number",
      width: 150,
      renderCell: (params) => {
        return changePriorityIcon(
          params.row.priority,
          params.row.ticket_number
        );
      },
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 250,
    },
    {
      field: "customer_plan",
      headerName: "User Plan",
      width: 100,
      renderCell: (params) => {
        return params.row.customer_plan ? params.row.customer_plan : "-";
      },
    },
    {
      field: "service_provided",
      headerName: "Service",
      width: 150,
    },
    {
      field: "engineer",
      headerName: "Engineer",
      width: 150,
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.status}
            color={colorCombination[params.row.status_color]}
          />
        );
        // <Tag color={params.row.status_color}>{params.row.status}</Tag>;
      },
    },

    {
      field: "payment_status",
      headerName: "Payment Status",
      width: 120,
      renderCell: (params) => {
        return getPaymentStatus(params.row.id, paymentStatusList);
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        return moment(params.row.createdAt).format("DD/MM/YYYY");
      },
    },
    {
      field: "last_modified",
      headerName: "Last Modified",
      width: 150,
      renderCell: (params) => {
        return moment(
          Helper.getNewestData(
            params.row.updatedAt,
            selectPaymentUpdatedAt(
              data.data.paymentDetailList ? data.data.paymentDetailList : [],
              params.row.id
            )
          )
        ).fromNow();
        // return moment(params.row.updatedAt).fromNow();
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditIcon color="primary" />}
          label="Edit Details"
          onClick={handleEditBtn(params.row)}
        />,
        <a onClick={() => handleViewBtn(params.row)}>
          <VisibilityIcon color="primary" />
        </a>,
        <a
          className="ticket-ellipsis-btn"
          onClick={(e) =>
            handleClick({
              event: e,
              id: params.row.id,
              status: params.row.status,
              priority: params.row.priority,
              statusColor: params.row.status_color,
            })
          }
        >
          <MoreHorizIcon color="primary" />
        </a>,
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
            onClick={() => handlePriority("URGENT", params.row.status)}
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
            Set priority to High <NorthIcon className="priority-high" />
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
            Set priority to Low <SouthIcon className="priority-low" />
          </MenuItem>
          <Divider />
          <MenuItem
            disabled={status === "Closed"}
            onClick={() => handleStatus("Open", "green")}
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
            onClick={() => handleStatus("Pending", "blue")}
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
            onClick={() => handleStatus("On Hold", "orange")}
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
            onClick={() => handleStatus("Closed", "red")}
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
            onClick={() => handlePaymentStatus(status)}
          >
            Payment Status
          </MenuItem>
        </Menu>,
        // <GridActionsCellItem
        //   icon={<ModeEditIcon color="primary" />}
        //   label="Edit Details"
        //   onClick={handleEditBtn(params.row)}
        // />,
        // <GridActionsCellItem
        //   icon={<VisibilityIcon color="primary" />}
        //   label="View details"
        //   onClick={handleViewBtn(params.mobile)}
        // />,
      ],
    },
  ]);

  return (
    <>
      <UserLayout>
        <Card
          sx={{
            margin: "4% 0%",
            padding: "20px 10px",
            borderRadius: "8px",
            height: "calc(100vh - 90px)",
          }}
        >
          <CardHeader
            title="Tickets"
            action={
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleNewTicketBtn()}
              >
                New Ticket
              </Button>
            }
          ></CardHeader>
          {data ? (
            <>
              <DataGrid
                sx={{
                  height: "calc(100vh - 180px)",
                }}
                initialState={{
                  filter: {
                    filterModel: {
                      items: [
                        {
                          columnField: "status",
                          operatorValue: "isAnyOf",
                          value: ["Open", "On Hold", "Pending"],
                        },
                      ],
                    },
                  },
                }}
                columns={columns}
                rows={data.data.rows}
                components={{ Toolbar: GridToolbar }}
              />
            </>
          ) : (
            <>
              <h2>No Tickets Found</h2>
            </>
          )}

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
        </Card>
      </UserLayout>
    </>
  );
};

export default Tickets;

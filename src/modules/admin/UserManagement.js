import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../layout/User";
import { useGetAllUserQuery } from "../../services/admin";
import RegisterUserModal from "./RegisterUserModal";
import {
  SET_USER_LIST,
  SET_DEFAULT_USER_DATA,
  SET_AMC_LIST,
} from "./adminSlice";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import Helper from "../../util/helper";
import TablePagination from "@mui/material/TablePagination";
// import { Card ,Table} from 'antd';
import { PlusOutlined } from "@ant-design/icons";
// import { Button } from 'antd';
import { Typography } from "antd";
const { Text } = Typography;
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";

import { Card, CardHeader, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.admin.userList);
  const amcList = useSelector((state) => state.admin.amcList);

  const [registerModalShow, setRegisterModalShow] = useState(false);
  const [forView, setForView] = useState(false);
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data, error, isLoading, refetch } = useGetAllUserQuery({
    limit: 9999999999,
    offset: 0,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditBtn = React.useCallback((user) => () => {
    dispatch(SET_DEFAULT_USER_DATA({ data: user }));
    navigate("/admin/register-user", {
      state: {
        mobile: user.mobile,
        forEdit: true,
        id: user.id,
      },
    });
  });

  const handleViewBtn = React.useCallback((mobile) => () => {
    console.log(
      "🚀 ~ file: UserManagement.js:68 ~ handleViewBtn ~ mobile:",
      mobile
    );
    if (userList.length > 0) {
      userList.map((item) => {
        if (item.mobile === mobile) {
          console.log(
            "🚀 ~ file: UserManagement.js:73 ~ userList.map ~ item.id:",
            item.id
          );
          setUserId(item.id);
        }
      });
    }
    setForView(true);
    setMobile(mobile);
    setRegisterModalShow(true);
  });

  const handlePlusBtn = () => {
    navigate("/admin/register-user");
  };

  useEffect(() => {
    dispatch(SET_USER_LIST({ data: data?.data?.rows }));
    dispatch(SET_AMC_LIST({ data: data?.data?.amcList }));
  }, [data, forView]);

  useEffect(() => {
    refetch();
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

  const columns = React.useMemo(() => [
    { field: "user_id", headerName: "ID", width: 150 },
    {
      field: "fullName",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      width: 400,
      sortable: false,
      valueGetter: (params) => `${Helper.transformUserName(params.row)}`,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 200,
    },
    {
      field: "mobile",
      headerName: "Contact Number",
      type: "mobile",
      width: 150,
    },
    {
      field: "role",
      headerName: "User Role",
      width: 150,
      renderCell: (params) => {
        return params.row.role === "AMC"
          ? `${params.row.role} Customer`
          : params.row.role === "USER"
          ? "Customer"
          : params.row.role;
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
        <GridActionsCellItem
          icon={<VisibilityIcon color="primary" />}
          label="View details"
          onClick={handleViewBtn(params.row.mobile)}
        />,
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
            title="User Management"
            action={
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handlePlusBtn()}
              >
                Add User
              </Button>
            }
          ></CardHeader>
          {data ? (
            <>
              <DataGrid
                sx={{
                  height: "calc(100vh - 180px)",
                }}
                columns={columns}
                rows={data.data.rows}
                components={{ Toolbar: GridToolbar }}
              />
            </>
          ) : (
            <>
              <h2>No User Found</h2>
            </>
          )}
          <RegisterUserModal
            forView={forView}
            mobile={mobile}
            show={registerModalShow}
            userId={userId}
            onHide={() => setRegisterModalShow(false)}
            closeEdit={() => setForEdit(false)}
            closeView={() => setForView(false)}
          />
        </Card>
      </UserLayout>
    </>
  );
};

export default UserManagement;

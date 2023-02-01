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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import Helper from "../../util/helper";
import TablePagination from '@mui/material/TablePagination';
// import { Card ,Table} from 'antd';
import {
  PlusOutlined
  } from '@ant-design/icons';
  // import { Button } from 'antd';
  import { Typography } from 'antd';
const { Text } = Typography;
// const { Meta } = Card;

import {Card, CardHeader ,Button} from '@mui/material';
import { DataGrid, GridActionsCellItem ,GridToolbar} from '@mui/x-data-grid';


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
  
  const { data, error, isLoading } = useGetAllUserQuery({ limit: rowsPerPage, offset: page * rowsPerPage});
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditBtn = React.useCallback((user)=> () => {
   console.log(user);
    dispatch(SET_DEFAULT_USER_DATA({ data: user }));
    navigate("/admin/register-user", {
      state: {
        mobile:user.mobile,
        forEdit: true,
      },
    });
  });

  const handleViewBtn = React.useCallback(
     (mobile) =>() => {
    if (userList.length > 0) {
      userList.map((item) => {
        if (item.mobile === mobile) {
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

  const columns = React.useMemo(
    () =>  [
    { field: 'user_id', headerName: 'ID', width: 150, },
    {
      field: 'fullName',
      headerName: 'Name',
      description: 'This column has a value getter and is not sortable.',
      width: 400,
      sortable: false,
      valueGetter: (params) =>
        `${Helper.transformUserName(params.row)}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 200,
    },
    {
      field: 'mobile',
      headerName: 'Contact Number',
      type: 'mobile',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'User Role',
      width: 150,
    },
  
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditIcon color="primary"/>}
          label="Edit Details"
          onClick={handleEditBtn(params.row)}
        />,
        <GridActionsCellItem
          icon={<VisibilityIcon color="primary" />}
          label="View details"
          onClick={handleViewBtn(params.mobile)}
        />,
      ]
    },
  ],
 );

  return (
    <>
      <UserLayout>
      <Card
    sx={{
      margin: '4% 0%',
      padding: '20px 10px',
      borderRadius: '8px',
      height : 'calc(100vh - 90px)'
    }}
    >
      <CardHeader title="User Management" action={<Button variant="contained"  startIcon={<AddIcon />} onClick={() => handlePlusBtn()}>
      Add User
     </Button>}></CardHeader>
      {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data ? (
              <>
                {/* <div className="user-management-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                        <th>User Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data &&
                        data?.data?.rows?.length > 0 &&
                        data.data.rows.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.user_id ? item.user_id : "-"}</td>
                              <td>
                                {Helper.transformUserName(item)}
                              </td>
                              <td>{item.email}</td>
                              <td>{item.mobile}</td>
                              <td>
                                {item.role === "AMC"
                                  ? `${item.role} Customer`
                                  : item.role === "USER"
                                  ? `Customer`
                                  : item.role}
                              </td>
                              <td className="admin-actions">
                                <a
                                  className="user-mngt-edit-btn"
                                  onClick={() => handleEditBtn(item.mobile)}
                                >
                                  <EditTwoTone />
                                </a>
                                <a onClick={() => handleViewBtn(item.mobile)}>
                                  <EyeTwoTone />
                                </a>
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
                /> */}
                 <DataGrid autoHeight={true} columns={columns} rows={data.data.rows} components={{ Toolbar: GridToolbar }} />
              </>
            ) : (
              <></>
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

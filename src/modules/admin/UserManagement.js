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
import { EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import Helper from "../../util/helper";
import TablePagination from '@mui/material/TablePagination';

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

  const handleEditBtn = (mobile) => {
    if (userList.length > 0) {
      userList.map((user) => {
        if (user.mobile === mobile) {
          amcList.map((amc) => {
            if (amc.user_profile_id === user.id) {
              dispatch(SET_DEFAULT_USER_DATA({ data: { ...user, ...amc } }));
            } else {
              dispatch(SET_DEFAULT_USER_DATA({ data: user }));
            }
          });
        }
      });
    }
    navigate("/admin/register-user", {
      state: {
        mobile,
        forEdit: true,
      },
    });
  };

  const handleViewBtn = (mobile) => {
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
  };

  const handlePlusBtn = () => {
    navigate("/admin/register-user");
  };

  useEffect(() => {
    dispatch(SET_USER_LIST({ data: data?.data?.rows }));
    dispatch(SET_AMC_LIST({ data: data?.data?.amcList }));
  }, [data, forView]);

  return (
    <>
      <UserLayout>
        <div className="">
          <div className="user-management-card">
            <h3>User Management</h3>
            {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data ? (
              <>
                <h5>
                  {data?.data?.totalCount ? data?.data?.totalCount : 0} records
                  found
                </h5>
                <div className="user-management-table">
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
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <div class="plus-btn-block">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => handlePlusBtn()}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
        <RegisterUserModal
          forView={forView}
          mobile={mobile}
          show={registerModalShow}
          userId={userId}
          onHide={() => setRegisterModalShow(false)}
          closeEdit={() => setForEdit(false)}
          closeView={() => setForView(false)}
        />
      </UserLayout>
    </>
  );
};

export default UserManagement;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserLayout from "../../layout/User";
import { useGetAllUserQuery } from "../../services/admin";
import RegisterUserModal from "./RegisterUserModal";
import { SET_USER_LIST } from './adminSlice';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons';

const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList = useSelector((state) => state.admin.userList);
    const { data, error, isLoading } = useGetAllUserQuery();

    const [registerModalShow, setRegisterModalShow] = useState(false);
    const [forView, setForView] = useState(false);
    const [mobile, setMobile] = useState('');
    const [userId, setUserId] = useState('');


    const handleEditBtn = (mobile) => {
        navigate('/admin/register-user', {
            state: {
                mobile,
                forEdit: true,
            }
        });
    };

    const handleViewBtn = (mobile) => {
        if (userList.length > 0) {
            userList.map(item => {
              if(item.mobile === mobile) {
                  console.log("🚀 ~ file: UserManagement.js:35 ~ handleViewBtn ~ item.mobile", item.mobile, item.id)
                setUserId(item.id);
              }
            });
        }
        setForView(true);
        setMobile(mobile);
        setRegisterModalShow(true);
    };

    const handlePlusBtn = () => {
        navigate('/admin/register-user');
    }

    useEffect(() => {
        dispatch(SET_USER_LIST({ data: data?.data?.rows }));
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
                            <h5>{data?.data?.totalCount ? data?.data?.totalCount : 0} records found</h5>
                            <div className="user-management-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Email Address</th>
                                            <th>Contact Number</th>
                                            <th>User Role</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data && data?.data?.rows?.length > 0 && data.data.rows.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.first_name} {(item.last_name !== 'null') ? item.last_name : '' }</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.mobile}</td>
                                                    <td>{item.role}</td>
                                                    <td className='admin-actions'>
                                                        <a 
                                                            className="user-mngt-edit-btn" 
                                                            onClick={() => handleEditBtn(item.mobile)}
                                                        >
                                                            <EditTwoTone />
                                                        </a>
                                                        <a onClick={() => handleViewBtn(item.mobile)} ><EyeTwoTone /></a>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : <></>}
                </div>
                <div class="plus-btn-block">
                    <Fab color="primary" aria-label="add" onClick={() => handlePlusBtn()}>
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
	)
}

export default UserManagement;

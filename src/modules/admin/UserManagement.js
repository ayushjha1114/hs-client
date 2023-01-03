import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserLayout from "../../layout/User";
import { useGetAllUserQuery } from "../../services/admin";
import RegisterUserModal from "./RegisterUserModal";
import { SET_USER_LIST } from './adminSlice';

const UserManagement = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetAllUserQuery();
    const [registerModalShow, setRegisterModalShow] = useState(false);
    const [forEdit, setForEdit] = useState(false);
    const [forView, setForView] = useState(false);
    const [mobile, setMobile] = useState('');


    const handleEditBtn = (mobile) => {
        setForEdit(true);
        setMobile(mobile);
        setRegisterModalShow(true);
    };

    const handleViewBtn = (mobile) => {
        setForView(true);
        setMobile(mobile);
        setRegisterModalShow(true);
    };

    useEffect(() => {
        dispatch(SET_USER_LIST({ data: data?.data?.rows }));
    }, [data, forEdit, forView]);

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
                                                        <button 
                                                            className="user-mngt-edit-btn" 
                                                            type="button"
                                                            onClick={() => handleEditBtn(item.mobile)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleViewBtn(item.mobile)} type="button">View</button>
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
            </div>
            <RegisterUserModal
                forEdit={forEdit}
                forView={forView}
                mobile={mobile}
                show={registerModalShow}
                onHide={() => setRegisterModalShow(false)}
                closeEdit={() => setForEdit(false)}
                closeView={() => setForView(false)}
            />
            </UserLayout>
        </>
	)
}

export default UserManagement;

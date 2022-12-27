import React, { useEffect, useState } from 'react';
import UserLayout from "../../layout/User";
import { useGetAllUserQuery } from "../../services/admin";

const UserManagement = () => {
    const { data, error, isLoading } = useGetAllUserQuery();
    // console.log("🚀 ~ file: UserManagement.js:7 ~ UserManagement ~ data", data)

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
                            <h5>{data.data.totalCount} records found</h5>
                            {/* <table>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Action</th>
                            </tr>
                            {
                                data.data.rows.map(item => (
                                <tr>
                                    <td>{item.first_name} {item.last_name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td><a>edit</a></td>
                                </tr>
                                ))
                            }
                            </table> */}
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
                                        {data.data.rows && data.data.rows.length > 0 && data.data.rows.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.first_name} {item.last_name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.mobile}</td>
                                                    <td>{item.role}</td>
                                                    <td className='admin-actions'>
                                                        <button type="button">Edit</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
            </UserLayout>
        </>
	)
}

export default UserManagement;

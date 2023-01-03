import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserLayout from "../../layout/User";

const ComplainList = () => {
    const error = '';
    const isLoading  = false;
    const data = {
        data: {
            totalCount: 5,
            rows: [{
                    name: 'ayush', 
                    subject: 'shipped',
                    agent: 'ddd',
                    status: 'active',
                    last_message: '2 min ago',
                }
            ]
        }
    }

	return (
        <>
            <UserLayout>
            <div className="">
                <div className="user-management-card">
                    <h3>Complain List</h3>
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
                                            <th>Requester</th>
                                            <th>Subject</th>
                                            <th>Agent</th>
                                            <th>Status</th>
                                            <th>Last message</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data && data?.data?.rows?.length > 0 && data.data.rows.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.name}</td>
                                                    <td>{item.subject}</td>
                                                    <td>{item.agent}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.last_message}</td>
                                                    <td className='admin-actions'>
                                                        <button onClick={() => handleViewBtn(item.mobile)} type="button">actions</button>
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
            </UserLayout>
        </>
	)
}

export default ComplainList;

import React, { useState } from "react";
import UserLayout from "../../layout/User";
import { useGetAllUserQuery } from "../../services/admin";

const AdminDashboard = (props) => {
  const { data, error, isLoading } = useGetAllUserQuery({ limit: 10, offset: 0});

  return (
    <>
        <UserLayout>
          <div className="">
            {/* <div className="distributor-info-block">Hi there yo man!!!</div> */}
            <div className="card">
              <div className="card-row">
                <div className="card-row-col">
                  <h3>ADMIN DASHBOARD</h3>
                  {error ? (
                    <>Oh no, there was an error</>
                    ) : isLoading ? (
                      <>Loading...</>
                      ) : data ? (
                        <>
                        <h5>{data?.data?.totalCount ? data?.data?.totalCount : 0} records found</h5>
                        <table>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                          </tr>
                          {
                            data?.data && data?.data?.rows?.length > 0 && data?.data?.rows.map(item => (
                              <tr>
                                <td>{item.first_name} {item.last_name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                              </tr>
                            ))
                          }
                        </table>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </UserLayout>
    </>
  );
};

export default AdminDashboard;
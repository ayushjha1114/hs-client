import React from "react";
import "./Dashboard.css";
import UserLayout from "../../layout/User";
import { useGetAllPostsQuery } from "../../services/auth";
import { useGetAllUserQuery } from "../../services/admin";


let AdminDashboard = (props) => {
  const totalCount = 100;

  // const { data, error, isLoading } = useGetAllPostsQuery();
  const { data, error, isLoading } = useGetAllUserQuery();
  console.log("🚀 ~ file: Dashboard.js:13 ~ AdminDashboard ~ data, error, isLoading", data, error)

  // const { data: aaa } = useGetAllUsersQuery();
  // console.log("🚀 ~ file: Dashboard.js:13 ~ AdminDashboard ~ aaa", useGetAllUsersQuery())


  return (
    <>
        <UserLayout>
          <div className="distributor-main-page">
            <div className="distributor-info-block">Hi there yo man!!!</div>

            <div className="card">
              <div className="card-row">
                <div className="card-row-col">
                  <h3>User Management</h3>
                  {error ? (
                    <>Oh no, there was an error</>
                    ) : isLoading ? (
                      <>Loading...</>
                      ) : data ? (
                        <>
                        <h5>{data.data.totalCount} records found</h5>
                        <table>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                          </tr>
                          {
                            data.data.rows.map(item => (
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
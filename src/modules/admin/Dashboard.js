import React from "react";
import "./Dashboard.css";
import UserLayout from "../../layout/User";
import { useGetAllPostsQuery } from "../../services/auth";
import { useGetAllUsersQuery } from "../../services/admin";


let AdminDashboard = (props) => {
  const totalCount = 100;

  // const { data, error, isLoading } = useGetAllPostsQuery();
  const { data, error, isLoading } = useGetAllUsersQuery();
  console.log("🚀 ~ file: Dashboard.js:13 ~ AdminDashboard ~ data, error, isLoading", data, error, isLoading)

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
                  <h3>Heading</h3>
                  <h5>{totalCount} records found</h5>
                  {error ? (
                    <>Oh no, there was an error</>
                  ) : isLoading ? (
                    <>Loading...</>
                  ) : data ? (
                    <>
                      <h3>{data[0].title}</h3>
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
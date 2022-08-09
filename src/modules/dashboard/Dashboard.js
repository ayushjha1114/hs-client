import React from "react";
import "./Dashboard.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import UserLayout from "../../layout/User";
import { useGetAllPostsQuery } from "../../services/auth";

let Dashboard = (props) => {
  const { width } = useWindowDimensions();

  const totalCount = 100;

  const { data, error, isLoading } = useGetAllPostsQuery();

  return (
    <>
      {width > 767 ? (
        <UserLayout>
          <div className="distributor-main-page">
            <div className="distributor-info-block">Hi there</div>

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
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;
